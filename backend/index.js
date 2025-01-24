require("dotenv").config();
const mongoose = require("mongoose");
const config = require("./config.json");
const bcrypt = require("bcrypt");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const SHGUser = require("./models/user.model");
const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "*" }));

// MongoDB Connection
mongoose.connect(config.connectionString, {
  serverSelectionTimeoutMS: 5000 // Timeout after 5 seconds
})
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit process if unable to connect
  });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// Route to Create Account
app.post("/create-account", async (req, res) => {
  const { orgName, leadName, uid, members, loc, description, email, pass } = req.body;

  // Validation: Ensure all fields are present
  if (!orgName || !email || !pass || !leadName || !uid || !members || !loc || !description) {
    return res.status(400).json({ error: true, message: "All fields are required" });
  }

  try {
    // Check if user already exists
    const isUser = await SHGUser.findOne({ email });
    if (isUser) {
      return res.status(400).json({ error: true, message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(pass, 10);

    // Create a new user
    const newUser = new SHGUser({
      orgName,
      leadName,
      uid,
      members,
      loc,
      description,
      email,
      pass: hashedPassword
    });

    // Save user to database
    await newUser.save();

    // Generate JWT token
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "72h" }
    );

    return res.status(201).json({
      error: false,
      user: {
        orgName: newUser.orgName,
        leadName: newUser.leadName,
        uid: newUser.uid,
        members: newUser.members,
        loc: newUser.loc,
        description: newUser.description,
        email: newUser.email
      },
      accessToken,
      message: "Registration Successful"
    });
  } catch (error) {
    console.error("Error creating account:", error);
    return res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});
//Login
app.post("/login", async (req, res) => {
  const { email, pass } = req.body;

  if (!email || !pass) {
      return res.status(400).json({ message: "Email and Password required!" });
  }

  const user = await SHGUser.findOne({ email });
  if (!user) {
      return res.status(400).json({ message: "User not found" });
  }

  const isPasswordValid = await bcrypt.compare(pass, user.pass);
  if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Credentials" })
  }

  const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "72h" }
  );

  return res.status(201).json({
      error: false,
      user: { orgName: user.orgName, uid: user.uid, email: user.email },
      accessToken,
      message: "Login Successful"
  });
});

// Start the server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

module.exports = app;
