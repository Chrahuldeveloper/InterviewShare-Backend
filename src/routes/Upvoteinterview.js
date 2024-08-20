const express = require("express");
const voteInterviewsRoute = express.Router();
const users = require("../models/User");

voteInterviewsRoute.post("/interviews/:userId/:interviewId/upvote", async (req, res) => {
  try {
    const { userId, interviewId } = req.params;

    const user = await users.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const interview = user.interviews.id(interviewId);
    if (!interview) {
      return res.status(404).send("Interview not found");
    }

    if (interview.upvotedBy.includes(userId)) {
      return res.status(400).send("You have already upvoted this interview");
    }

    interview.upvotes += 1;
    interview.upvotedBy.push(userId);

    await user.save();

    res.status(200).json(interview);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});


module.exports = voteInterviewsRoute;
