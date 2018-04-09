const { Router } = require('express');
const VError = require('verror');
const debug = require('debug')('caster-blog');
const { ENSURE_AUTH } = require('../middleware').Auth;
const { Post } = require('../models');

const router = new Router();

router.post('/blog', ENSURE_AUTH, createPost);

module.exports = router;

function createPost(req, res, next) {
  const { body } = req;
  return Post.create(body)
    .then(post => {
      debug(`Post created: ${post.postID}`);
      res.redirect(`/blog/${post.postID}`);
    })
    .catch(e => next(new VError(e, 'Problem creating new post')));
}
