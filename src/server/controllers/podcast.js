const VError = require('verror');
const debug = require('debug')('caster-podcast');
const { Podcast } = require('../models');

module.exports.RENDER_HOME = (req, res) => {
  res.render('home');
};

module.exports.CREATE_PODCAST = (req, res, next) => {
  const {
    title,
    subtitle,
    website,
    author,
    keywords,
    description,
    explicit,
  } = req.body;

  const submit = {
    title,
    subtitle,
    website,
    author,
    keywords: keywords.split(/\s*,\s*/),
    description,
    isExplicit: explicit === 'yes' ? true : false,
  };

  return Podcast.create(submit)
    .then(podcast => {
      debug(`New Podcast Created: ${podcast.id}`);
      res.redirect(`/podcast/${podcast.id}`);
    })
    .catch(e =>
      next(new VError(e, 'There was a problem creating a new podcast')),
    );
};
