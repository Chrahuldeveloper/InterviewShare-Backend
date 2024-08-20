const express = require("express");
const getTrendingInterViewsRoute = express.Router();
const users = require("../models/User");
const mongoose = require("mongoose");
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
          "interviews.companyPic": 1,
          "interviews.position": 1,
          "interviews.experience": 1,
          "interviews.date": 1,
          "interviews.Name": 1,
          "interviews.selected": 1,
          "interviews.Level": 1,
          "interviews.rounds": 1,
          "interviews.CGPA": 1,
          "interviews.NumberofProblems": 1,
          "interviews.ProfilePic": 1,
          "interviews.interviewPlace": 1,
          "interviews.collage": 1,
          "interviews.Likes": 1,
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
    res.send("done");
  } catch (error) {
    console.log(error);
  }
});

getTrendingInterViewsRoute.get("/interviews/:interviewId", async (req, res) => {
  try {
    const { interviewId } = req.params;

    const interview = await users.aggregate([
      { $unwind: "$interviews" },
      { $match: { "interviews._id": new mongoose.Types.ObjectId(interviewId) } },
      {
        $project: {
          _id: 0,
          "interviews._id": 1,
          "interviews.company": 1,
          "interviews.companyPic": 1,
          "interviews.position": 1,
          "interviews.experience": 1,
          "interviews.date": 1,
          "interviews.Name": 1,
          "interviews.selected": 1,
          "interviews.Level": 1,
          "interviews.rounds": 1,
          "interviews.CGPA": 1,
          "interviews.NumberofProblems": 1,
          "interviews.ProfilePic": 1,
          "interviews.interviewPlace": 1,
          "interviews.collage": 1,
          "interviews.Likes": 1,
          "interviews.upvotes": 1,
        },
      },
    ]);

    if (interview.length === 0) {
      return res.status(404).send("Interview not found");
    }

    res.status(200).json(interview[0].interviews);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

module.exports = getTrendingInterViewsRoute;
