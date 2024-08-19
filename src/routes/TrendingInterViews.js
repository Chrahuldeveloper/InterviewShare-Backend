const express = require("express");
const getTrendingInterViewsRoute = express.Router();
const users = require("../models/User");

getTrendingInterViewsRoute.get("/interviews/trending", async (req, res) => {
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
    res.status(500).send("Server error");
  }
});

getTrendingInterViewsRoute.post("/experience/:jwt", async (req, res) => {
  try {
    const { jwt } = req.params;
    const {
      company,
      companyPic,
      position,
      experience,
      date,
      Name,
      selected,
      Level,
      rounds,
      CGPA,
      NumberofProblems,
      ProfilePic,
      interviewPlace,
      collage,
      Likes = 0,
      upvotes = 0,
    } = req.body;

    const user = await users.findById(jwt);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const newExperience = {
      company,
      companyPic,
      position,
      experience,
      date,
      Name,
      selected,
      Level,
      rounds,
      CGPA,
      NumberofProblems,
      ProfilePic,
      interviewPlace,
      collage,
      Likes,
      upvotes,
    };

    user.interviews.push(newExperience);
    await user.save();
  } catch (error) {
    console.log(error);
  }
});

module.exports = getTrendingInterViewsRoute;
