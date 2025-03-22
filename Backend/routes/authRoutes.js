const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, phone, countryCode } = req.body;

    if (!username || !email || !password || !phone || !countryCode) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newUser = new User({ username, email, password, phone, countryCode });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user: " + error.message });
  }
});
// Login route
// Login route
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
  
    try {
      console.log("Received credentials:", { username, password });
  
      // Check if the user exists in the database
      const user = await User.findOne({ username });
  
      if (!user) {
        console.log("User not found");
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      // Check if the password matches
      if (user.password !== password) {
        console.log("Invalid password");
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      console.log("User authenticated:", user);
      return res.status(200).json({ message: "Login successful" });
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ message: "Server error" });
    }
  });
  
  

module.exports = router;
