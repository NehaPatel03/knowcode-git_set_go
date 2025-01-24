require("dotenv").config();
const mongoose = require("mongoose");
const config = require("./config.json");
const bcrypt = require("bcrypt");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

mongoose.connect(config.connectionString);

const app = express();
app.use(express.json());
app.use(cors({origin: "*"}));

app.post("/", async(req, res)=> {
  return res.status(200).json("Api Running Well")
});

app.listen(5000);
module.exports = app;
