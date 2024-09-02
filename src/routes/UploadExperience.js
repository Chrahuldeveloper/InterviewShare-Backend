const express = require("express");
const interviewUploadRoute = express.Router();
const users = require("../models/User");

interviewUploadRoute.post("/upload/interviewUpload/:jwt", async (req, res) => {
  try {
    const { jwt } = req.params;
    const { interview } = req.body;

    console.log(interview)

    if (!jwt) {
      return res.status(400).send("JWT is required");
    }

    const user = await users.findById(jwt);
    if (!user) {
      return res.status(404).send("User not found");
    }
    user.interviews.push(interview);
    console.log(interview);
    console.log(user);

    await user.save();

    res.status(200).send("Interview experience uploaded successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

interviewUploadRoute.get("/upload/interviewUpload/:jwt", async (req, res) => {
  try {
    const { jwt } = req.params;

    if (!jwt) {
      return res.status(400).send("JWT is required");
    }

    const user = await users.findById(jwt);

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.status(200).json(user.interviews);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

module.exports = interviewUploadRoute;
