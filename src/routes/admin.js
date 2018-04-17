const { Router } = require('express');
const VError = require('verror');
const { ENSURE_AUTH } = require('@herc/middleware').Auth;
const { Blog, Podcast } = require('@herc/config');
const { Podcast: PodcastModel, Post } = require('../models');

const router = Router();

router.get('/admin', ENSURE_AUTH, renderAdmin);

module.exports = router;

function renderAdmin(req, res, next) {
  return Promise.all([
    Podcast.active ? PodcastModel.find() : null,
    Blog.active ? Post.find() : null,
  ])
    .then(([podcasts, posts]) => {
      res.render('admin', { podcasts, posts });
    })
    .catch(e =>
      next(new VError(e, 'There was a problem creating main admin page.')),
    );
}
