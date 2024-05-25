const express = require("express");
const router = express.Router();
// @ts-ignore
const mongoose = require("mongoose");
// @ts-ignore
const middleware = require("../utils/middleware");

const User = require("../model/user.model");

// Create user
router.post("/login", async (req, res) => {
  const { username, icon } = req.body;
  const findUser = await User.findOne({ username: username.trim() });
  if (findUser) {
    return res.status(200).json({success: true, user: findUser});
  }
  const user = new User({
    username: username.trim(),
    icon: icon.trim(),
  });

  await user.save();
  res.json({success: true, user});
});

// Get all users
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});



module.exports = router;
