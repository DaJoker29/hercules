const VError = require('verror');
const fs = require('fs-extra');
const debug = require('debug')('caster-podcast');
const { Podcast } = require('../models');

module.exports.RENDER_HOME = (req, res, next) => {
  return Podcast.find({})
    .then(podcasts => {
      res.render('home', { podcasts });
    })
    .catch(e => next(new VError(e, 'There was a problem fetching podcasts')));
};

module.exports.HANDLE_PODCAST = (req, res, next) => {
  const { slug } = req.params;
  const { action } = req.query;
  return Podcast.findOne({ slug })
    .then(podcast => {
      if (action) {
        console.log(`Action: ${action} on ${podcast.slug}`);
      }
      res.render('podcast', { podcast });
    })
    .catch(e => next(new VError(e, 'Problem fetching that podcast')));
};

module.exports.CREATE_PODCAST = (req, res, next) => {
  const { file: cover } = req;
  console.log(cover);
  const {
    title,
    subtitle,
    website,
    author,
    keywords,
    description,
    explicit,
    slug,
  } = req.body;

  const submit = {
    title,
    subtitle,
    website,
    author,
    keywords: keywords.split(/\s*,\s*/),
    description,
    slug,
    isExplicit: explicit === 'yes' ? true : false,
  };

  return Podcast.create(submit)
    .then(podcast => {
      debug(`New Podcast Created: ${podcast.id}`);

      const dir = `content/${podcast.slug}`;
      try {
        fs.statSync(dir);
      } catch (e) {
        fs.mkdirSync(dir);
      }
      debug(`Saving cover image to ${dir}`);

      res.redirect(`/podcast/${podcast.id}`);
      return fs.writeFile(
        `${dir}/cover.${cover.originalname.slice(
          cover.originalname.lastIndexOf('.') + 1,
        )}`,
        cover.buffer,
      );
    })
    .catch(e =>
      next(new VError(e, 'There was a problem creating a new podcast')),
    );
};
