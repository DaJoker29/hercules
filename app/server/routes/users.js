const { Router } = require('express');
const passport = require('passport');
const { User, Post } = require('../models');

const router = new Router();

router.get('/users', fetchUsers);
router.get(
  '/user/:username',
  passport.authenticate('jwt', { session: false }),
  fetchSingleUser
);

module.exports = router;

async function fetchSingleUser(req, res, next) {
  const { username } = req.params;
  try {
    const user = await User.find({ username });
    const posts = await Post.find({ 'author._id': user._id }).populate(
      'author'
    );
    const result = Object.assign({ posts, user });
    res.json(result);
  } catch (e) {
    next(e);
  }
}

async function fetchUsers(req, res, next) {
  try {
    const users = await User.find().populate('author');
    res.json(users);
  } catch (e) {
    next(e);
  }
}
