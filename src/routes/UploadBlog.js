const express = require("express");
const blogUploadRoute = express.Router();
const users = require("../models/User");

blogUploadRoute.post("/:jwt", async (req, res) => {
  try {
    const { jwt } = req.params;
    const { blog } = req.body;
    const user = await users.findById(jwt);
    if (!user) {
      return res.status(404).send("User not found");
    }
    user.blogs.push(blog);
    await user.save();
    res.status(200).send("Blog uploaded successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

blogUploadRoute.get("/:jwt", async (req, res) => {
  try {
    const { jwt } = req.params;

    const user = await users.findById(jwt);

    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).json(user.blogs);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

module.exports = blogUploadRoute;
