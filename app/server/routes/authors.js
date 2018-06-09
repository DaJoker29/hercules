const { Router } = require('express');
const { Author } = require('../models');

const router = new Router();

router.get('/authors', fetchAllAuthors);
router.get('/author/:id', fetchSingleAuthor);

module.exports = router;

async function fetchSingleAuthor(req, res, next) {
  const { id } = req.params;
  try {
    const author = await Author.findOne({ uid: id });
    const result = Object.assign(
      { postURL: `/api/posts?author=${author.uid}` },
      JSON.parse(JSON.stringify(author))
    );
    res.json(result);
  } catch (e) {
    next(e);
  }
}

async function fetchAllAuthors(req, res, next) {
  try {
    const authors = await Author.find();
    const result = authors.map(author => {
      return Object.assign(
        { postURL: `/api/posts?author=${author.uid}` },
        JSON.parse(JSON.stringify(author))
      );
    });
    res.json(result);
  } catch (e) {
    next(e);
  }
}
