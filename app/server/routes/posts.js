const { Router } = require('express');
const extractor = require('keyword-extractor');
const { Post } = require('../models');

const router = new Router();

router.get('/posts', returnPosts);
router.post('/posts', createPost); // Add Auth

module.exports = router;

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

async function returnPosts(req, res, next) {
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
