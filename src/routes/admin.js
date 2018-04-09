const { Router } = require('express');
const VError = require('verror');
const { Podcast, Post } = require('../models');

const router = Router();

router.get('/', renderHome);

module.exports = router;

function renderHome(req, res, next) {
  return Promise.all([Podcast.find({}), Post.find()])
    .then(([podcasts, posts]) => {
      res.render('home', { podcasts, posts });
    })
    .catch(e => next(new VError(e, 'There was a problem fetching podcasts')));
}
