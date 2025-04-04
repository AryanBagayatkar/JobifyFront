// userProfileRoutes.js
const express = require("express");
const router = express.Router();
const UserProfile = require("../models/UserProfile");

// POST route to create or update profile
router.post("/", async (req, res) => {
  const { experiences, educations, skills } = req.body;

  try {
    // Create a new profile document in MongoDB without explicitly passing the userId
    const newProfile = new UserProfile({
      experiences,
      educations,
      skills
    });

    // Save the profile to the database
    const savedProfile = await newProfile.save();

    // Return the newly created profile with its MongoDB `_id` (which serves as `userId` here)
    res.status(200).json({ message: "Profile saved successfully", profile: savedProfile });
  } catch (err) {
    res.status(500).json({ message: "Error saving profile", error: err.message });
  }
});

// GET profile by MongoDB's `_id`
router.get("/:profileId", async (req, res) => {
  try {
    const profile = await UserProfile.findById(req.params.profileId);  // Using MongoDB's _id
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
