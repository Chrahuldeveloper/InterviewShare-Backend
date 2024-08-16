const express = require("express");
const getTrendingInterViewsRoute = express.Router();
const users = require("../models/User");
getTrendingInterViewsRoute.get("/interviews/trending", async () => {
  try {
    const trendingInterviews = await users.aggregate([
      { $unwind: "$interviews" },
      { $sort: { "interviews.upvotes": -1 } },
      { $limit: 10 },
      {
        $project: {
          _id: 0,
          "interviews._id": 1,
          "interviews.company": 1,
          "interviews.position": 1,
          "interviews.experience": 1,
          "interviews.upvotes": 1,
        },
      },
    ]);

    res.status(200).json(trendingInterviews.map((item) => item.interviews));
  } catch (error) {
    console.log(error);
  }
});

module.exports = getTrendingInterViewsRoute;
