const { Router } = require('express');
const VError = require('verror');
const extractor = require('keyword-extractor');
const debug = require('debug')('herc-blog');
const { ENSURE_AUTH } = require('../middleware').Auth;
const { Post } = require('../models');

const router = new Router();

router.post('/blog', ENSURE_AUTH, createPost);
router.get('/blog/:slug', renderPost);

module.exports = router;

function createPost(req, res, next) {
  const { id, content, title, excerpt } = req.body;
  // Filter out weird characters before tagging
  // TODO: Tagging doesn't work well with apostrophes
  const tags = extractor.extract(content.replace(/[^A-Za-z0-9 ]/g, ' '), {
    language: 'english',
    remove_digits: true,
    return_changed_case: true,
    remove_duplicates: true,
  });

  // If post ID exists, update Post instead of creating one
  if (id) {
    const update = {
      content,
      title,
      excerpt,
      tags,
    };
    return Post.findOneAndUpdate({ _id: id }, update, { new: true })
      .then(post => {
        debug(`Post updated: ${post.postID}`);
        res.redirect(`/blog/${post.postID}`);
      })
      .catch(e => next(new VError(e, 'Problem editing post')));
  } else {
    const result = {
      content,
      title,
      excerpt,
      author: req.user.id,
      tags,
    };

    return Post.create(result)
      .then(post => {
        debug(`Post created: ${post.postID}`);
        res.redirect(`/blog/${post.postID}`);
      })
      .catch(e => next(new VError(e, 'Problem creating new post')));
  }
}

function renderPost(req, res, next) {
  const { slug } = req.params;
  const { action } = req.query;

  if (action) {
    switch (action) {
      case 'delete':
        return Post.findOneAndRemove({ postID: slug })
          .then(post => {
            debug(`Deleted post: ${post.title} (${post.postID})`);
            return res.redirect('/admin');
          })
          .catch(e => next(new VError(e, `Problem deleting post ${slug}`)));
      case 'edit':
        return Post.findOne({ postID: slug })
          .then(post => {
            return res.render('editor', { post });
          })
          .catch(e => next(new VError(e, `Problem editing post ${slug}`)));
    }
  }

  return Post.findOne({ postID: slug })
    .then(post => {
      res.render('post', { post });
    })
    .catch(e => next(new VError(e, 'Problem rendering post')));
}
