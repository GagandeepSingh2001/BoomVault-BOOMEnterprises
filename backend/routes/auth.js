const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Route for signup
router.post("/signup", async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, username, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: "Account created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Route for login
router.post("/login", async (req, res) => {
  const { identifier, password } = req.body; // identifier = email or username

  try {
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }]
    });

    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1d" });

    res.json({ token, username: user.username });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;