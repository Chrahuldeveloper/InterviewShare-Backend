const express = require("express");
const userprofileRoute = express.Router();
const users = require("../models/User");
const mongoose = require("mongoose");

userprofileRoute.post("/:userjwt", async (req, res) => {
  try {
    const { userjwt } = req.params;
    const { name, bio, profilePic } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userjwt)) {
      return res.status(400).send("Invalid User ID");
    }

    const user = await users.findById(userjwt);
    if (!user) {
      return res.status(404).send("User not found");
    }

    if (name) user.Name = name;
    if (bio) user.bio = bio;
    if (profilePic) user.ProfilePic = profilePic;

    await user.save();

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

userprofileRoute.get("/:userjwt", async (req, res) => {
  try {
    const { userjwt } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userjwt)) {
      return res.status(400).send("Invalid User ID");
    }

    const user = await users.findById(userjwt).select("Name ProfilePic bio");
    if (!user) {
      return res.status(404).send("User not found");
    }

    res.status(200).json({
      name: user.Name,
      profilePic: user.ProfilePic,
      bio: user.bio,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).send("Server error");
  }
});

module.exports = userprofileRoute;
