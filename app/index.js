const path = require('path');
const express = require('express');
const morganDebug = require('morgan-debug');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const helmet = require('helmet');
const passport = require('passport');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const moment = require('moment');
const numeral = require('numeral');
const VError = require('verror');
const csrf = require('csurf');

const debug = require('debug')('herc-init');
const errDebug = require('debug')('herc-error');

const config = require('@herc/config');
const Routes = require('@herc/server/routes');
const Strategies = require('@herc/server/strategies');
const { User, Post } = require('@herc/server/models');

/**
 * Variables and Constants
 */

const app = (module.exports = express());
const isProduction = process.env.NODE_ENV === 'production';
const sessionSettings = {
  resave: false,
  secret: process.env.SESSION_SECRET || 'howsekritisit',
  saveUninitialized: false,
  store: new RedisStore({
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
  }),
};

/**
 * Express/Passport Configuration
 */

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'server/views'));

app.use(express.static('app/public'));
// app.use('/media', express.static('media'));
// app.use('/.well-known', express.static('.well-known', { dotfiles: 'allow' }));
app.use(morganDebug('herc-morgan', isProduction ? 'combined' : 'dev'));
app.use(bodyParser.urlencoded({ extended: 'true' }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(helmet());
app.use(session(sessionSettings));
app.use(csrf());
app.use(passport.initialize());
app.use(passport.session());

app.locals = {
  moment,
  numeral,
  config,
};

passport.use(Strategies.Local);
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

app.use(passUserToLocal);
app.use(csrfToken);

/**
 * Load required routes
 */

debug('Loading Auth/Admin modules');
app.use(Routes.Admin);
app.use(Routes.Auth);
app.get('/', renderIndex);

/**
 * Configure Modules
 */
if (config.modules.blog) {
  debug('Loading Blog module');
  app.use(Routes.Blog);
  app.use(Routes.Editor);
}

if (config.modules.podcast) {
  debug('Loading Podcast module');
  app.use(Routes.Podcast);
}

/**
 * Error Handling Routes
 */

// For Testing Purposes
app.use('/fail', forceFailure);
app.use('*', pageNotFound);
app.use(serverError);

function serializeUser(user, done) {
  return done(null, user.id);
}

function deserializeUser(id, done) {
  User.findById(id)
    .then(user => {
      done(null, user);
    })
    .catch(e => done(e));
}

function passUserToLocal(req, res, next) {
  res.locals.user = req.user;
  next();
}

function forceFailure(req, res, next) {
  const error = new VError('Intentionally Triggered Error');
  next(error);
}

/* eslint-disable no-unused-vars */

function pageNotFound(req, res, next) {
  errDebug(`Page not found: ${req.path}`);
  return res.status(404).render('error', {
    title: 'Page Not Found',
    message: 'Can not find that page',
  });
}

function serverError(err, req, res, next) {
  const error = new VError(err, 'Unhandled Server Error');
  errDebug(error.stack);
  return res.status(500).render('error', {
    title: 'Server Error',
    message: 'Looks like something broke.',
    error: isProduction ? null : error,
  });
}
/* eslint-enable no-unused-vars */

function csrfToken(req, res, next) {
  res.locals.csrfToken = req.csrfToken();
  next();
}

function renderIndex(req, res, next) {
  if (config.modules.blog) {
    return Post.find()
      .sort({ created: -1 })
      .populate('author')
      .then(posts => {
        res.render('blog', { posts });
      })
      .catch(e => next(new VError(e, 'Problem rendering blog')));
  } else {
    return res.render('error', {
      title: 'No Blog Found',
      message: 'Not a whole lot to show here.',
    });
  }
}
