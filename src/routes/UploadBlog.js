const express = require("express");
const blogUploadRoute = express.Router();
const users = require("../models/User");
const mongoose = require("mongoose");

blogUploadRoute.post("/blog/:jwt", async (req, res) => {
  try {
    const { jwt } = req.params;

    console.log(jwt);

    if (!mongoose.Types.ObjectId.isValid(jwt)) {
      return res.status(400).send("Invalid User ID");
    }

    const { title, img, sections, comments = [] } = req.body;

    console.log(title, img, sections);

    const user = await users.findById(jwt);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const newBlog = {
      title,
      img,
      sections,
      comments,
    };

    user.blogs.push(newBlog);
    await user.save();

    res.status(200).send("Blog uploaded successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

blogUploadRoute.get("/blog/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await users.findOne({ "blogs._id": id }, { "blogs.$": 1 });

    if (!user || !user.blogs.length) {
      return res.status(404).send("Blog not found");
    }

    res.status(200).json({ blog: user.blogs[0] });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

blogUploadRoute.get("/blog/:jwt", async (req, res) => {
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

blogUploadRoute.post("/blog/:jwt/:blogId/comment", async (req, res) => {
  try {
    const { jwt, blogId } = req.params;
    const { comment } = req.body;

    const user = await users.findById(jwt);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const blog = user.blogs.id(blogId);
    if (!blog) {
      return res.status(404).send("Blog not found");
    }

    const newComment = { comment, repliedAt: null };
    blog.comments.push(newComment);

    await user.save();

    res.status(200).send("Comment added successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

blogUploadRoute.get("/blogs", async (req, res) => {
  try {
    const usersWithBlogs = await users.find({}).select("blogs");
    const allBlogs = usersWithBlogs.flatMap((user) => user.blogs);
    res.status(200).json(allBlogs);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

blogUploadRoute.post(
  "/blog/:jwt/:blogId/comment/:commentId/reply",
  async (req, res) => {
    try {
      const { jwt, blogId, commentId } = req.params;
      const { reply } = req.body;

      const user = await users.findById(jwt);
      if (!user) {
        return res.status(404).send("User not found");
      }

      const blog = user.blogs.id(blogId);
      if (!blog) {
        return res.status(404).send("Blog not found");
      }

      const comment = blog.comments.id(commentId);
      if (!comment) {
        return res.status(404).send("Comment not found");
      }

      if (user._id.toString() !== jwt) {
        return res
          .status(403)
          .send("You are not authorized to reply to this comment");
      }

      comment.reply = reply;
      comment.repliedAt = new Date();

      await user.save();

      res.status(200).send("Reply added successfully");
    } catch (error) {
      console.log(error);
      res.status(500).send("Server error");
    }
  }
);

module.exports = blogUploadRoute;
