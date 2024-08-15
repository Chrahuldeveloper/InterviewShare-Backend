const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
  tittle: { type: String, required: true },
  para: { type: String, required: true },
});

const blogSchema = new mongoose.Schema({
  tittle: { type: String, required: true },
  img: { type: String, required: true },
  sections: [sectionSchema],
});

module.exports = blogSchema;
