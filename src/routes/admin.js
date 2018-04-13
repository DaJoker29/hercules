const { Router } = require('express');
const VError = require('verror');
const { ENSURE_AUTH } = require('@herc/middleware').Auth;
const { Podcast, Post } = require('../models');

const router = Router();

// router.use(ENSURE_AUTH);

router.get('/admin', ENSURE_AUTH, renderAdmin);
router.get('/admin/blog', ENSURE_AUTH, renderBlogAdmin);

module.exports = router;

function renderAdmin(req, res, next) {
  return Promise.all([Podcast.find({}), Post.find()])
    .then(([podcasts, posts]) => {
      res.render('admin', { podcasts, posts });
    })
    .catch(e =>
      next(new VError(e, 'There was a problem creating main admin page.')),
    );
}

function renderBlogAdmin(req, res) {
  res.render('admin-blog');
}
