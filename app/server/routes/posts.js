const { Router } = require('express');
const { Post } = require('../models');

const router = new Router();

router.get('/posts', returnPosts);

module.exports = router;

async function returnPosts(req, res, next) {
  let posts = [];
  try {
    posts = await Post.find().populate('author');
    res.json(posts);
  } catch (e) {
    next(e);
  }
}
