const { Router } = require('express');
const { Category } = require('../models');

const router = new Router();

router.get('/categories', fetchCategories);
router.get('/category/:slug', fetchCategory);

module.exports = router;

async function fetchCategory(req, res, next) {
  const { slug } = req.params;

  try {
    const category = await Category.findOne({ slug });
    const postURL = `/api/posts?category=${category.slug}`;
    const result = Object.assign(
      { postURL },
      JSON.parse(JSON.stringify(category))
    );
    res.json(result);
  } catch (e) {
    next(e);
  }
}

async function fetchCategories(req, res, next) {
  let categories = [];
  try {
    categories = await Category.find();
    const result = categories.map(category => {
      const postURL = `/api/posts?category=${category.slug}`;
      return Object.assign({ postURL }, JSON.parse(JSON.stringify(category)));
    });
    res.json(result);
  } catch (e) {
    next(e);
  }
}
