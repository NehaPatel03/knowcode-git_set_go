require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const SHGUser = require("./models/user.model");
const CompanyUser = require("./models/companyuser.model");
const app = express();
const config = require("./config.json")

// Middleware
app.use(express.json());
app.use(cors({ origin: "*" }));

// MongoDB Connection
mongoose.connect(config.connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000 // Timeout after 5 seconds
})
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit process if unable to connect
  });

// Route to Create SHG User Account
app.post("/create-account", async (req, res) => {
  const { orgName, leadName, uid, members, loc, description, email, pass } = req.body;

  // Validation: Ensure all fields are present
  if (!orgName || !email || !pass || !leadName || !uid || !members || !loc || !description) {
    return res.status(400).json({ error: true, message: "All fields are required" });
  }

  try {
    // Check if SHG user already exists
    const isUser = await SHGUser.findOne({ email });
    if (isUser) {
      return res.status(400).json({ error: true, message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(pass, 10);

    // Create a new SHG user
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
    console.error("Error creating SHG user:", error);
    return res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

// Route to Create Company User Account
app.post("/company-create-account", async (req, res) => {
  const { companyName, contactPerson, regiNo, loc, email, password } = req.body;

  // Validation: Ensure all fields are present
  if (!companyName || !email || !password || !contactPerson || !regiNo || !loc) {
    return res.status(400).json({ error: true, message: "All fields are required" });
  }

  try {
    // Check if company user already exists
    const isUser = await CompanyUser.findOne({ email });
    if (isUser) {
      return res.status(400).json({ error: true, message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new company user
    const newUser = new CompanyUser({
      companyName,
      contactPerson,
      regiNo,
      loc,
      email,
      password: hashedPassword
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
        companyName: newUser.companyName,
        contactPerson: newUser.contactPerson,
        regiNo: newUser.regiNo,
        loc: newUser.loc,
        email: newUser.email
      },
      accessToken,
      message: "Registration Successful"
    });
  } catch (error) {
    console.error("Error creating account:", error.message, error.stack);
    return res.status(500).json({ error: true, message: "Internal Server Error" });
}
});

// Login Route
app.post("/login", async (req, res) => {
  const { email, pass } = req.body;

  if (!email || !pass) {
    return res.status(400).json({ error: true, message: "Email and Password are required" });
  }

  try {
    // Check if the user exists in SHG users
    let user = await SHGUser.findOne({ email });

    // If not found, check in company users
    if (!user) {
      user = await CompanyUser.findOne({ email });
    }

    if (!user) {
      return res.status(400).json({ error: true, message: "User not found" });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(pass, user.pass);
    if (!isPasswordValid) {
      return res.status(400).json({ error: true, message: "Invalid Credentials" });
    }

    // Generate JWT token
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "72h" }
    );

    return res.status(200).json({
      error: false,
      user: {
        email: user.email,
        ...(user.orgName && { orgName: user.orgName }),
        ...(user.companyName && { companyName: user.companyName })
      },
      accessToken,
      message: "Login Successful"
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

app.post("/company-login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: true, message: "Email and Password are required" });
  }

  try {
    // Check if the user exists in SHG users
    let user = await CompanyUser.findOne({ email });

    // If not found, check in company users
    if (!user) {
      user = await CompanyUser.findOne({ email });
    }

    if (!user) {
      return res.status(400).json({ error: true, message: "User not found" });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: true, message: "Invalid Credentials" });
    }

    // Generate JWT token
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "72h" }
    );

    return res.status(200).json({
      error: false,
      user: {
        email: user.email,
        ...(user.orgName && { orgName: user.orgName }),
        ...(user.companyName && { companyName: user.companyName })
      },
      accessToken,
      message: "Login Successful"
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
