const { Router } = require('express');
const { Post } = require('@app/server/models');
const VError = require('verror');

const router = (module.exports = Router());

router.get('/search', returnSearch);

function returnSearch(req, res, next) {
  const { term } = req.query;
  return Post.find()
    .sort({ created: -1 })
    .populate('author')
    .then(posts => {
      const tags = [];
      posts.forEach(post => {
        post.tags.forEach(tag => {
          if (tags.indexOf(tag) === -1) {
            tags.push(tag);
          }
        });
      });
      res.render('blog', {
        posts: posts.filter(post => post.tags.indexOf(term) !== -1),
        tags,
      });
    })
    .catch(e => next(new VError(e, 'Problem rendering blog')));
}
