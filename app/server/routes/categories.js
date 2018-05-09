const { Router } = require('express');
const { Category } = require('../models');

const router = new Router();

router.get('/categories', fetchCategories);

module.exports = router;

async function fetchCategories(req, res, next) {
  let categories = [];
  try {
    categories = await Category.find();
    res.json(categories);
  } catch (e) {
    next(e);
  }
}
