const path = require('path');
const dotenv = require('dotenv');

const env = dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
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
const envDebug = require('debug')('herc-env');
const dbDebug = require('debug')('herc-database');
const errDebug = require('debug')('herc-error');

const Routes = require('@herc/routes');
const Strategies = require('@herc/strategies');
const { User, Post } = require('@herc/models');
const Config = require('@herc/config');

/**
 * Check for envirnment variables
 */

if (env.error) {
  throw new VError(env.error, 'Could not load environment variables');
} else {
  Object.entries(env.parsed).forEach(rule => {
    envDebug(`${rule[0]} = ${rule[1]}`);
  });
}

/**
 * Variables and Constants
 */

const app = express();

const isProduction = process.env.NODE_ENV === 'production';

const port = isProduction ? process.env.PORT : process.env.TEST_PORT;
const db = isProduction ? process.env.DB : process.env.TEST_DB;

const pkg = require('./package.json');

/**
 * Database Connection Handlers
 */

mongoose.connection.on('error', err => {
  if (err) throw new VError(err, 'Problem connecting to database.');
});

mongoose.connection.on('disconnected', () => {
  dbDebug('Disconnected from database.');
});

mongoose.connection.on('connected', () => {
  dbDebug('Successfully connected to database.');

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
  app.set('views', path.join(__dirname, 'src/views'));

  app.use('/assets', express.static('dist'));
  app.use('/media', express.static('media'));
  app.use('/.well-known', express.static('.well-known', { dotfiles: 'allow' }));
  app.use(morganDebug('herc-morgan', isProduction ? 'combined' : 'dev'));
  app.use(bodyParser.urlencoded({ extended: 'true' }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(helmet());
  app.use(session(sessionSettings));
  app.use(csrf());
  app.use(passport.initialize());
  app.use(passport.session());

  app.locals.moment = moment;
  app.locals.numeral = numeral;
  app.locals.pkg = pkg;
  app.locals.config = Config;

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
  if (Config.Blog.active) {
    debug('Loading Blog module');
    app.locals.blog = Config.Blog;
    app.use(Routes.Blog);
    app.use(Routes.Editor);
  }

  if (Config.Podcast.active) {
    debug('Loading Podcast module');
    app.locals.podcast = Config.Podcast;
    app.use(Routes.Podcast);
  }

  /**
   * Error Handling Routes
   */

  // For Testing Purposes
  app.use('/fail', forceFailure);
  app.use('*', pageNotFound);
  app.use(serverError);

  /**
   * Launch Server
   */

  app.listen(port, err => {
    if (err) throw new VError(err, 'Problem launching express server');
    debug(
      `${pkg.name.toUpperCase()} is spinning UP... => http://localhost:${port}`,
    );
  });
});

/**
 * Connect to database
 */

dbDebug(`Connecting to database: ${db}`);
mongoose.connect(db);

/**
 * Termination and Exit handling
 */

process.on('SIGINT', gracefulExit);
process.on('SIGTERM', gracefulExit);
process.on('uncaughtException', err => {
  console.error(err.stack);
  debug(`${pkg.name.toUpperCase()} has CRASHED in a whirl of fire...`);
  gracefulExit(1);
});

function gracefulExit(code = 0) {
  debug(`${pkg.name.toUpperCase()} is settling DOWN`);
  if (mongoose.connection.readyState === 1) {
    mongoose.connection.close(() => {
      process.exit(code);
    });
  } else {
    process.exit(code);
  }
}

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
  if (Config.Blog.active) {
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
