const express = require("express");
const router = express.Router();
// @ts-ignore
const mongoose = require("mongoose");
// @ts-ignore
const middleware = require("../utils/middleware");

const Post = require("../model/post.model");

// create post
router.post("/", async (req, res) => {
  const { content, userId, image } = req.body;
  const post = new Post({
    content: content.trim(),
    user: userId.trim(),
    image: image.trim(),
  });

  await post.save();
  res.json({success: true, post});
});


// get all posts
router.get("/", async (req, res) => {
  const posts = await Post.find().populate("user");
  res.json({success: true, posts});
});



module.exports = router;
