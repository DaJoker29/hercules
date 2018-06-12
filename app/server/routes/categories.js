const { Router } = require('express');
const { Category } = require('../models');

const router = new Router();

router.get('/categories', fetchCategories);
router.get('/category/:slug', fetchCategory);
router.post('/categories', createCategory); // Add Auth
router.put('/category/:slug', updateCategory); // Add Auth
router.delete('/category/:slug', deleteCategory); // Add Auth

module.exports = router;

async function deleteCategory(req, res, next) {
  const { slug } = req.params;
  try {
    const category = await Category.findOneAndRemove({ slug });
    res.json(category);
  } catch (e) {
    next(e);
  }
}

async function updateCategory(req, res, next) {
  const { slug } = req.params;
  const update = {};

  try {
    if (req.body.slug) {
      update.slug = req.body.slug;
    }

    if (req.body.label) {
      update.label = req.body.label;
    }
    const updated = await Category.findOneAndUpdate({ slug }, update, {
      new: true
    });
    const category = await Category.findOne({ slug: updated.slug });
    const result = Object.assign(
      { postURL: `/api/posts?category=${category.slug}` },
      JSON.parse(JSON.stringify(category))
    );
    res.json(result);
  } catch (e) {
    next(e);
  }
}

async function createCategory(req, res, next) {
  const { slug, label } = req.body;

  try {
    const created = await Category.create({ slug, label });
    const category = await Category.findOne({ slug: created.slug });
    const result = Object.assign(
      { postURL: `/api/posts?category=${category.slug}` },
      JSON.parse(JSON.stringify(category))
    );
    res.json(result);
  } catch (e) {
    next(e);
  }
}

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
