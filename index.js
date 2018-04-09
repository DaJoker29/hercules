const path = require('path');
const dotenv = require('dotenv');

const env = dotenv.config();

// TODO: Add CSRF module (csurf) to secure form submissions
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

const debug = require('debug')('caster-init');
const envDebug = require('debug')('caster-env');
const routeDebug = require('debug')('caster-routes');
const dbDebug = require('debug')('caster-database');

const Routes = require('./src/routes');
const Strategies = require('./src/strategies');
const Middleware = require('./src/middleware');

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
  app.use(morganDebug('caster-morgan', isProduction ? 'combined' : 'dev'));
  app.use(bodyParser.urlencoded({ extended: 'true' }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(helmet());
  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  app.locals.moment = moment;
  app.locals.numeral = numeral;

  passport.use(Strategies.Local);
  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);

  app.use(Middleware.Auth.ENSURE_AUTH);

  /**
   * Load express routes
   */
  Object.entries(Routes)
    .sort(a => {
      if (a[0] === 'Error') {
        // Error routes must be loaded last.
        return 1;
      }
      return 0;
    })
    .forEach(route => {
      routeDebug(`${route[0]} routes - Loaded`);
      app.use(route[1]);
    });

  /**
   * Launch Server
   */

  app.listen(port, err => {
    if (err) throw new VError(err, 'Problem launching express server');
    debug(`Caster is spinning UP... => http://localhost:${port}`);
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
  debug('Caster has CRASHED in a whirl of fire...');
  gracefulExit(1);
});

function gracefulExit(code = 0) {
  debug(`Caster is settling DOWN`);
  if (mongoose.connection.readyState === 1) {
    mongoose.connection.close(() => {
      process.exit(code);
    });
  } else {
    process.exit(code);
  }
}

function serializeUser(user, done) {
  return done(null, '1234');
}

function deserializeUser(id, done) {
  done(null, { id: '1234' });
}
