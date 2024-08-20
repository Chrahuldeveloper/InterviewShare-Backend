const express = require("express");
const profileRouter = express.Router();
const users = require("../models/User");

profileRouter.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await users.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      Name: user.Name,
      blogs: user.blogs,
      interviews: user.interviews,
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = profileRouter;
