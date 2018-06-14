const { Router } = require('express');
const { Author } = require('../models');

const router = new Router();

router.get('/authors', fetchAllAuthors);
router.get('/author/:id', fetchSingleAuthor);
router.post('/authors', createNewAuthor); // Add Authentication
router.put('/author/:id', updateAuthor); // Add Authentication
router.delete('/author/:id', deleteAuthor);

module.exports = router;

async function deleteAuthor(req, res, next) {
  const { id } = req.params;
  try {
    const author = await Author.findOneAndRemove({ uid: id });
    res.json(author);
  } catch (e) {
    next(e);
  }
}

async function updateAuthor(req, res, next) {
  const { id } = req.params;
  const { displayName } = req.body;
  const update = {};

  try {
    if (displayName) update.displayName = displayName;

    const updated = await Author.findOneAndUpdate({ uid: id }, update, {
      new: true
    });
    const author = await Author.findOne({ uid: updated.uid });
    const result = Object.assign(
      { postURL: `/api/posts?author=${author.uid}` },
      JSON.parse(JSON.stringify(author))
    );
    res.json(result);
  } catch (e) {
    next(e);
  }
}

async function createNewAuthor(req, res, next) {
  const { email, username, displayName } = req.body;

  if (!email || !username) {
    return next('No email or username provided');
  }

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
    const author = await Author.findOne({ uid: id }).select('-_id -__v');
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
    const authors = await Author.find().select('-_id -__v');
    const result = authors.map(author => {
      return Object.assign(
        {
          postsURL: `/api/posts?author=${author.uid}`,
          authorURL: `/api/author/${author.uid}`
        },
        JSON.parse(JSON.stringify(author))
      );
    });
    res.json(result);
  } catch (e) {
    next(e);
  }
}
