const express = require("express");
const interviewUploadRoute = express.Router();
const users = require("../models/User");

interviewUploadRoute.post("/:jwt", async (req, res) => {
  try {
    const { jwt } = req.params;
    const { interview } = req.body;

    const user = await users.findById(jwt);

    if (!user) {
      return res.status(404).send("User not found");
    }

    user.interviews.push(interview);

    await users.save();

    res.status(200).send("Interview experience uploaded successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

interviewUploadRoute.get("/:jwt", async (req, res) => {
  try {
    const { jwt } = req.params;

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
