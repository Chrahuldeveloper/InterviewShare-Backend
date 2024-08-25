const express = require("express");
const userprofileRoute = express.Router();
const users = require("../models/User");
const mongoose = require("mongoose");

userprofileRoute.post("/user/update/:userjwt", async (req, res) => {
  try {
    const { userjwt } = req.params;
    const { name, bio, profilepic } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userjwt)) {
      return res.status(400).send("Invalid User ID");
    }

    const user = await users.findById(userjwt);
    if (!user) {
      return res.status(404).send("User not found");
    }

    if (name) user.name = name;
    if (bio) user.bio = bio;
    if (profilepic) user.profilepic = profilepic;

    await user.save();

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

userprofileRoute.get("/user/update/:userjwt", async (req, res) => {
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
      name: user.name,
      profilepic: user.profilepic,
      bio: user.bio,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).send("Server error");
  }
});

userprofileRoute.put("/user/update/:userjwt", async (req, res) => {
  try {
    const { userjwt } = req.params;

    const { name, bio, profilepic } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userjwt)) {
      return res.status(400).send("Invalid User ID");
    }

    const user = await users.findById(userjwt);
    if (!user) {
      return res.status(404).send("User not found");
    }

    if (name) user.Name = name;
    if (bio) user.bio = bio;
    if (profilepic) user.profilepic = profilepic;

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        name: user.name,
        bio: user.bio,
        profilepic: user.profilepic,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

module.exports = userprofileRoute;
