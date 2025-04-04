// models/UserProfile.js
const mongoose = require("mongoose");

const UserProfileSchema = new mongoose.Schema({
  experiences: [
    {
      role: String,
      company: String,
      duration: String,
      description: String,
    },
  ],
  educations: [
    {
      institution: String,
      degree: String,
      fieldOfStudy: String,
      duration: String,
      description: String,
    },
  ],
  skills: [String],  // Array of skills
}, { timestamps: true });

module.exports = mongoose.model("UserProfile", UserProfileSchema);
