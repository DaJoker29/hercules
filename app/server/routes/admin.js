const { Router } = require('express');
const VError = require('verror');
const { ENSURE_AUTH } = require('@app/server/middleware').Auth;
const { Podcast, Post } = require('../models');

const router = Router();

router.get('/admin', ENSURE_AUTH, renderAdmin);

module.exports = router;

function renderAdmin(req, res, next) {
  const { config } = req.app.locals;
  return Promise.all([
    config.modules.podcast ? Podcast.find() : null,
    config.modules.blog
      ? Post.find()
          .sort({ created: -1 })
          .populate('author')
      : null,
  ])
    .then(([podcasts, posts]) => {
      res.render('admin', { podcasts, posts });
    })
    .catch(e =>
      next(new VError(e, 'There was a problem creating main admin page.'))
    );
}
