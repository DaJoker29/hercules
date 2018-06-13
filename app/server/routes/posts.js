const { Router } = require('express');
const extractor = require('keyword-extractor');
const { Post } = require('../models');

const router = new Router();

router.get('/posts', fetchPosts);
router.get('/post/:pid', fetchSinglePost);
router.post('/posts', createPost); // Add Auth
router.put('/post/:pid', editPost); //Add Auth
router.delete('/post/:pid', deletePost); // Add Auth

module.exports = router;

async function deletePost(req, res, next) {
  try {
    const { pid } = req.params;

    const deleted = await Post.findOneAndRemove({ pid });
    res.json(deleted);
  } catch (e) {
    next(e);
  }
}

async function editPost(req, res, next) {
  try {
    const { pid } = req.params;
    const { title, content, description, categories } = req.body;
    const update = {};

    if (title) update.title = title;
    if (description) update.description = description;
    if (categories) update.categories = categories;
    if (content) {
      const tags = extractor.extract(content.replace(/[^A-Za-z0-9 ]/g, ' '), {
        language: 'english',
        remove_digits: true,
        return_changed_case: true,
        remove_duplicates: true
      });

      update.content = content;
      update.tags = tags;
    }

    const updated = await Post.findOneAndUpdate({ pid }, update, { new: true })
      .populate('author')
      .populate('categories');

    const authorURL = `/api/author/${updated.author.uid}`;
    const categoriesURL = updated.categories.map(
      category => `/api/category/${category.slug}`
    );

    updated.author = undefined;
    updated.categories = undefined;

    const result = Object.assign(
      { authorURL, categoriesURL },
      JSON.parse(JSON.stringify(updated))
    );

    res.json(result);
  } catch (e) {
    next(e);
  }
}

async function fetchSinglePost(req, res, next) {
  try {
    const { pid } = req.params;
    const post = await Post.findOne({ pid })
      .populate('author', 'uid')
      .populate('categories', 'slug');

    const authorURL = `/api/author/${post.author.uid}`;
    const categoriesURL = post.categories.map(
      category => `/api/category/${category.slug}`
    );

    post.author = undefined;
    post.categories = undefined;

    const result = Object.assign(
      { authorURL, categoriesURL },
      JSON.parse(JSON.stringify(post))
    );

    res.json(result);
  } catch (e) {
    next(e);
  }
}

async function createPost(req, res, next) {
  const { title, content, description, author, categories } = req.body;

  try {
    const tags = extractor.extract(content.replace(/[^A-Za-z0-9 ]/g, ' '), {
      language: 'english',
      remove_digits: true,
      return_changed_case: true,
      remove_duplicates: true
    });

    const created = await Post.create({
      title,
      content,
      description,
      author,
      categories,
      tags
    });
    const result = created;
    res.json(result);
  } catch (e) {
    next(e);
  }
}

async function fetchPosts(req, res, next) {
  const { author, category } = req.query;
  try {
    let posts = await Post.find()
      .populate('author', 'uid')
      .populate('categories', 'slug');

    if (author || category) {
      posts = posts.filter(post => {
        if (author && category) {
          return (
            post.author.uid === author &&
            post.categories.findIndex(cat => cat.slug === category) > -1
          );
        } else {
          return (
            post.author.uid === author ||
            post.categories.findIndex(cat => cat.slug === category) > -1
          );
        }
      });
    }

    const result = posts.map(post => {
      const authorURL = `/api/author/${post.author.uid}`;
      const categoriesURL = post.categories.map(
        category => `/api/category/${category.slug}`
      );

      post.author = undefined;
      post.categories = undefined;

      return Object.assign(
        { authorURL, categoriesURL },
        JSON.parse(JSON.stringify(post))
      );
    });

    res.json(result);
  } catch (e) {
    next(e);
  }
}
