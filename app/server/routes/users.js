const { Router } = require('express');
const { User } = require('../models');

const router = new Router();

router.get('/users', fetchUsers);

module.exports = router;

async function fetchUsers(req, res, next) {
  try {
    const users = await User.find().populate('author');
    res.json(users);
  } catch (e) {
    next(e);
  }
}
