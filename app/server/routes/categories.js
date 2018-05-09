const { Router } = require('express');
const { Post, Category } = require('../models');

const router = new Router();

router.get('/categories', fetchCategories);
router.get('/category/:slug', fetchCategory);

module.exports = router;

async function fetchCategory(req, res, next) {
  let posts = [];
  const { slug } = req.params;

  try {
    const cat = await Category.findOne({ slug });
    posts = await Post.find({ categories: cat._id });
    res.json(posts);
  } catch (e) {
    next(e);
  }
}

async function fetchCategories(req, res, next) {
  let categories = [];
  try {
    categories = await Category.find();
    res.json(categories);
  } catch (e) {
    next(e);
  }
}
