const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  para: { type: String, required: true },
});

const commentSchema = new mongoose.Schema({
  comment: { type: String },
  reply: { type: String },
  repliedAt: { type: Date },
});

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  img: { type: String, required: true },
  sections: [sectionSchema],
  comments: [commentSchema],
});

module.exports = blogSchema;
