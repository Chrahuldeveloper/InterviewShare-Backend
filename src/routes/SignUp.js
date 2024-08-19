const express = require("express");
const signUpRoute = express.Router();
const users = require("../models/User")
signUpRoute.post("/", async (req, res) => {
  try {
    const { Name, email, password } = req.body;
    const isExists = await users.findOne({ email: email });
    if (isExists) {
      return res.status(400).send("User already exists");
    }
    const user = new users({
      Name: Name,
      email: email,
      password: password,
    });
    await user.save();
    res.status(200).send(user._id);
  } catch (error) {
    console.log(error);
  }
});

module.exports = signUpRoute;
