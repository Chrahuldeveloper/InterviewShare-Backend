const mongoose = require("mongoose");
const interviewSchema = require("./Interview");
const User = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  interviews: [interviewSchema],
});

const users = mongoose.model("users", User);

module.exports = users;
