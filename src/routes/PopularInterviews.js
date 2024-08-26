const express = require("express");
const popularInterviewsRoute = express.Router();
const users = require("../models/User");

popularInterviewsRoute.get("/interviews/popular", async (req, res) => {
  try {
    const popularInterviews = await users.aggregate([
      { $unwind: "$interviews" },
      { $sort: { "interviews.Likes": -1 } },
      {
        $project: {
          _id: 0,
          "interviews._id": 1,
          "interviews.company": 1,
          "interviews.role": 1,
          "interviews.location": 1,
          "interviews.upvotes": 1,
        },
      },
    ]);
    res.status(200).json(popularInterviews);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = popularInterviewsRoute;
