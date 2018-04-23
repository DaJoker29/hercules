const { Router } = require('express');
const slugify = require('slugify');
const multer = require('multer');
const VError = require('verror');
const fs = require('fs-extra');
const RSS = require('podcast');
const log = require('@tools/log')();
const { ENSURE_AUTH } = require('@herc/server/middleware').Auth;
const { Podcast } = require('../models');

const upload = multer();
const router = Router();

router.get('/podcast/new', ENSURE_AUTH, renderNewPodcast);
router.post('/podcast/new', upload.single('cover'), ENSURE_AUTH, createPodcast);
router.get('/podcast/:slug/rss', renderRSS);

// router.get('/podcast/:slug', handlePodcast);
// router.post('/podcast/:slug', upload.single('media'), createEpisode);

module.exports = router;

function renderNewPodcast(req, res) {
  res.render('new-podcast');
}

// function handlePodcast(req, res, next) {
//   const { slug } = req.params;
//   const { action } = req.query;
//   return Podcast.findOne({ slug })
//     .populate('episodes')
//     .then(podcast => {
//       if ('delete' === action) {
//         return Podcast.findByIdAndRemove(podcast.id).then(res.redirect('/'));
//       }
//       return res.render('podcast', { podcast });
//     })
//     .catch(e => next(new VError(e, 'Problem handling that podcast')));
// }

// function createPodcast(req, res, next) {
//   const { slug } = req.params;
//   const { file } = req;
//   const { publishedOn, title, description, podcast } = req.body;

//   return Episode.find({ podcast })
//     .then(episodes => {
//       const episodeNumber = episodes.length + 1;
//       const submit = {
//         publishedOn,
//         title,
//         description,
//         podcast,
//         episodeNumber,
//       };
//       return Episode.create(submit);
//     })
//     .then(episode => {
//       log(`New Episode Saved: ${episode.id}`);

//       const dir = `media/${slug}`;

//       return Promise.all([
//         fs.writeFile(
//           `${dir}/${slug}${episode.episodeNumber
//             .toString()
//             .padStart(3, '0')}.mp3`,
//           file.buffer,
//         ),
//         Podcast.findOneAndUpdate(
//           { _id: episode.podcast },
//           { $push: { episodes: episode.id } },
//           { new: true },
//         ),
//       ]);
//     })
//     .then(([, podcast]) => {
//       log(`Podcast Updated: ${podcast.id}`);
//       res.redirect(`/podcast/${podcast.slug}`);
//       return generateRSS(podcast.slug);
//     })
//     .then(xml => {
//       log(`RSS Feed regenerated: ${xml}`);
//     })
//     .catch(e => next(new VError(e, 'Problem creating episode')));
// }

function renderRSS(req, res, next) {
  const { slug } = req.params;
  return generateRSS(slug)
    .then(xml => {
      res.set('Content-Type', 'application/rss+xml');
      res.send(xml);
    })
    .catch(e => next(new VError(e, 'Problem generating the RSS Feed')));
}

function generateRSS(slug) {
  return new Promise((resolve, reject) => {
    Podcast.findOne({ slug })
      .populate('episodes')
      .then(async podcast => {
        const feedURL = `media/${podcast.slug}/rss`;

        const feed = new RSS({
          title: podcast.title,
          description: podcast.description,
          feed_url: feedURL,
          site_url: podcast.website,
          image_url: `/media/${podcast.slug}/cover.png`,
          managingEditor: podcast.author,
          webMaster: 'Zero Daedalus',
          copyright: `2018 ${podcast.author}`,
          pubDate: podcast.createdOn,
          ttl: '60',
          language: 'en',
          custom_namespaces: {
            itunes: 'http://www.itunes.com/dtds/podcast-1.0.dtd',
          },
          custom_elements: [
            { 'itunes:subtitle': 'A show about everything' },
            { 'itunes:author': 'John Doe' },
            {
              'itunes:summary':
                'All About Everything is a show about everything. Each week we dive into any subject known to man and talk about it as much as we can. Look for our podcast in the Podcasts app or in the iTunes Store',
            },
            {
              'itunes:owner': [
                { 'itunes:name': 'John Doe' },
                { 'itunes:email': 'john.doe@example.com' },
              ],
            },
            {
              'itunes:image': {
                _attr: {
                  href:
                    'http://example.com/podcasts/everything/AllAboutEverything.jpg',
                },
              },
            },
            {
              'itunes:category': [
                {
                  _attr: {
                    text: 'Technology',
                  },
                },
                {
                  'itunes:category': {
                    _attr: {
                      text: 'Gadgets',
                    },
                  },
                },
              ],
            },
          ],
        });

        podcast.episodes.forEach(episode => {
          const item = {
            title: episode.title,
            description: episode.description,
            date: episode.publishedOn,
            url: `/media/${podcast.slug}/${
              podcast.slug
            }${episode.episodeNumber.toString().padStart(3, '0')}.mp3`,
            enclosure: {
              url: `http://localhost:2001/media/${podcast.slug}/${
                podcast.slug
              }${episode.episodeNumber.toString().padStart(3, '0')}.mp3`,
              type: 'audio/mpeg',
              size: 12024,
            },
            custom_elements: [
              { 'itunes:author': 'John Doe' },
              { 'itunes:subtitle': 'A short primer on table spices' },
              {
                'itunes:image': {
                  _attr: {
                    href:
                      'http://example.com/podcasts/everything/AllAboutEverything/Episode1.jpg',
                  },
                },
              },
              { 'itunes:duration': '7:04' },
            ],
          };
          feed.item(item);
        });

        return resolve(feed.xml({ indent: true }));
      })
      .catch(e => reject(e));
  });
}

function createPodcast(req, res, next) {
  const { file, body } = req;
  const {
    title,
    subtitle,
    website,
    author,
    slug,
    description,
    explicit,
  } = body;

  const submit = {
    title,
    isExplicit: explicit === 'yes' ? true : false,
  };

  if (subtitle) submit.subtitle = subtitle;
  if (website) submit.website = website;
  if (author) submit.author = author;
  if (description) submit.description = description;
  if (slug) {
    submit.slug = slug;
  } else {
    submit.slug = slugify(title.slice(0, 19), { lower: true });
  }

  return Podcast.create(submit)
    .then(podcast => {
      log(`New Podcast Created: ${podcast.id}`);

      if (file) {
        const dir = `media/${podcast.slug}`;

        try {
          fs.statSync(dir);
        } catch (e) {
          fs.mkdirSync(dir);
        }

        log(`Saving cover image to ${dir}`);
        fs
          .writeFile(`${dir}/cover.png`, file.buffer)
          .then(() => log(`New cover art saved: ${dir}`))
          .catch(e =>
            next(new VError(e, 'There was a problem saving the cover art')),
          );
      }
      return podcast;
    })
    .then(podcast => {
      return res.redirect(`/podcast/${podcast.slug}`);
    })
    .catch(e =>
      next(new VError(e, 'There was a problem creating a new podcast')),
    );
}
