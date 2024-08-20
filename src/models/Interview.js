const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema({
  company: { type: String, required: true },
  companyPic: { type: String, required: true },
  position: { type: String, required: true },
  experience: { type: String, required: true },
  date: { type: String, required: true },
  Name: { type: String, required: true },
  selected: { type: Boolean, required: true },
  Level: { type: String, required: true },
  rounds: { type: String, required: true },
  CGPA: { type: String, required: true },
  NumberofProblems: { type: String, required: true },
  ProfilePic: { type: String, required: true },
  interviewPlace: { type: String, required: true },
  collage: { type: String, required: true },
  Likes: { type: Number, required: true },
  upvotes: { type: Number, required: true },
  upvotedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  applicationStory: { type: String, required: true },
  selectionReason: { type: String, required: true },
  preparation: { type: String, required: true },
  tip: { type: String, required: true },
});

module.exports = interviewSchema;
