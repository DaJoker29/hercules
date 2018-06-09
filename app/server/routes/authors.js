const { Router } = require('express');
const { Author } = require('../models');

const router = new Router();

router.get('/authors', fetchAllAuthors);
router.get('/author/:id', fetchSingleAuthor);
router.post('/authors', createNewAuthor); // Add Authentication

module.exports = router;

async function createNewAuthor(req, res, next) {
  const { email, username, displayName } = req.body;
  try {
    const created = await Author.create({ email, username, displayName });
    const author = await Author.findOne({ uid: created.uid });
    const result = Object.assign(
      { postURL: `/api/posts?author=${author.uid}` },
      JSON.parse(JSON.stringify(author))
    );
    res.json(result);
  } catch (e) {
    next(e);
  }
}

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
