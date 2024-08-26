const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  salaryRange: { type: String, required: true },
  location: { type: String, required: true },
  journey: { type: String, required: true },
  applicationStory: { type: String, required: true },
  interviewExperience: { type: String, required: true },
  preparation: { type: String, required: true },
  tip: { type: String, required: true },
  Likes: { type: Number, default: 0 },
  upvotes: { type: Number, default: 0 },
  upvotedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  ProfilePic: { type: String },
  interviewPlace: { type: String },
  collage: { type: String },
});

module.exports = interviewSchema;
