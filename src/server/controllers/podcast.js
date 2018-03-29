const VError = require('verror');
const fs = require('fs-extra');
const debug = require('debug')('caster-podcast');
const { Podcast, Episode } = require('../models');

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
    .populate('episodes')
    .then(podcast => {
      if ('delete' === action) {
        return Podcast.findByIdAndRemove(podcast.id).then(res.redirect('/'));
      }
      return res.render('podcast', { podcast });
    })
    .catch(e => next(new VError(e, 'Problem handling that podcast')));
};

module.exports.CREATE_EPISODE = (req, res, next) => {
  const { slug } = req.params;
  const { file } = req;
  const { publishedOn, title, description, podcast } = req.body;

  return Episode.find({ podcast })
    .then(episodes => {
      const episodeNumber = episodes.length + 1;
      const submit = {
        publishedOn,
        title,
        description,
        podcast,
        episodeNumber,
      };
      return Episode.create(submit);
    })
    .then(episode => {
      debug(`New Episode Saved: ${episode.id}`);

      const dir = `content/${slug}`;

      return Promise.all([
        fs.writeFile(
          `${dir}/${slug}${episode.episodeNumber
            .toString()
            .padStart(3, '0')}.mp3`,
          file.buffer,
        ),
        Podcast.findOneAndUpdate(
          { _id: episode.podcast },
          { $push: { episodes: episode.id } },
          { new: true },
        ),
      ]);
    })
    .then(([, podcast]) => {
      debug(`Podcast Updated: ${podcast.id}`);
      return res.redirect(`/podcast/${podcast.slug}`);
    })
    .catch(e => next(new VError(e, 'Problem creating episode')));
};

module.exports.CREATE_PODCAST = (req, res, next) => {
  const { file: cover } = req;
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

      res.redirect(`/podcast/${podcast.slug}`);
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
