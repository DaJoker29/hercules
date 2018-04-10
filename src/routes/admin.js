const { Router } = require('express');
const VError = require('verror');
const { Podcast, Post } = require('../models');

const router = Router();

router.get('/admin', renderAdmin);

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
