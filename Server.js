const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = 9000;
const {
  signUpRoute,
  blogUploadRoute,
  getTrendingInterViewsRoute,
  voteInterViewsRoute,
  profileRouter,
  userprofileRoute,
  interviewUploadRoute,
} = require("./src/routes/index");

app.use(express.json());

app.use(cors());

app.use("/signup", signUpRoute);
app.use("/", blogUploadRoute);
app.use("/", getTrendingInterViewsRoute);
app.use("/", voteInterViewsRoute);
app.use("/", profileRouter);
app.use("/", userprofileRoute);
app.use("/", interviewUploadRoute);
const startServer = async () => {
  console.log(`Server Started at http://localhost:${PORT}`);
};

const dbconnection = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017");
    console.log("DB connection established");
  } catch (error) {
    console.log(error);
  }
};

app.listen(PORT, async () => {
  await dbconnection();
  startServer();
});
