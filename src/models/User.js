const mongoose = require("mongoose");
const interviewSchema = require("./Interview");
const blogSchema = require("./Blogs");
const User = new mongoose.Schema({
  name: {
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
  blogs: [blogSchema],
  bio: { type: String },
  profilepic: { type: String },
});

const users = mongoose.model("users", User);
module.exports = users;
