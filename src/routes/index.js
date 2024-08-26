const signUpRoute = require("./SignUp.js");
const blogUploadRoute = require("./UploadBlog.js");
const getTrendingInterViewsRoute = require("./TrendingInterViews.js");
const voteInterViewsRoute = require("./Upvoteinterview.js");
const profileRouter = require("./UserProfile.js");
const userprofileRoute = require("./Profile.js");
const interviewUploadRoute = require("./UploadExperience.js");

module.exports = {
  signUpRoute,
  blogUploadRoute,
  getTrendingInterViewsRoute,
  voteInterViewsRoute,
  profileRouter,
  userprofileRoute,
  interviewUploadRoute
};
