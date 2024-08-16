const express = require("express");
const voteInterviewsRoute = express.Router();
const users = require("../models/User");

voteInterviewsRoute.post(
  "/interviews/:userId/:interviewId/upvote",
  async (req, res) => {
    try {
      const { userId, interviewId } = req.params;

      const user = await users.findOneAndUpdate(
        { _id: userId, "interviews._id": interviewId },
        { $inc: { "interviews.$.upvotes": 1 } },
        { new: true }
      );

      if (!user) {
        return res.status(404).send("User or Interview not found");
      }

      const updatedInterview = user.interviews.id(interviewId);
      res.status(200).json(updatedInterview);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = voteInterviewsRoute;
