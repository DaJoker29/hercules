const { Router } = require('express');
const passport = require('passport');
const { Author, Post } = require('../models');

const router = new Router();

router.get('/authors', fetchAllAuthors);
router.get(
  '/user/:username',
  passport.authenticate('jwt', { session: false }),
  fetchSingleAuthor
);

module.exports = router;

async function fetchSingleAuthor(req, res, next) {
  const { username } = req.params;
  try {
    const user = await Author.find({ username });
    const posts = await Post.find({ 'author._id': user._id }).populate(
      'author'
    );
    const result = Object.assign({ posts, user });
    res.json(result);
  } catch (e) {
    next(e);
  }
}

async function fetchAllAuthors(req, res, next) {
  try {
    const authors = await Author.find();
    const result = authors.map(author => {
      return Object.assign(
        { postURL: `/api/posts?author=${author.uid}` },
        JSON.parse(JSON.stringify(author))
      );
    });
    res.json(result);
  } catch (e) {
    next(e);
  }
}
