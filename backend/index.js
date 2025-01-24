const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err))

// Routes
app.use("/api/products", require("./routes/products"))
app.use("/api/consultants", require("./routes/consultants"))
app.use("/api/sales", require("./routes/sales"))
app.use("/api/dashboard", require("./routes/dashboard"))

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

