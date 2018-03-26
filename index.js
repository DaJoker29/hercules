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

const debug = require('debug')('caster-init');
const envDebug = require('debug')('caster-env');
const routeDebug = require('debug')('caster-routes');
const dbDebug = require('debug')('caster-database');

const Routes = require('./src/server/routes');
const Strategies = require('./src/server/strategies');
const Helpers = require('./src/server/helpers');
const Middleware = require('./src/server/middleware');

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

const { NODE_ENV } = process.env;

const port =
  NODE_ENV === 'production' ? process.env.PORT : process.env.TEST_PORT;
const db = NODE_ENV === 'production' ? process.env.DB : process.env.TEST_DB;

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
  app.set('views', path.join(__dirname, 'src/client/views'));

  app.use('/dist', express.static('assets'));
  app.use('/.well-known', express.static('.well-known', { dotfiles: 'allow' }));
  app.use(
    morganDebug(
      'caster-morgan',
      NODE_ENV === 'development' ? 'dev' : 'combined',
    ),
  );
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
  passport.serializeUser(Helpers.Auth.SERIALIZE);
  passport.deserializeUser(Helpers.Auth.DESERIALIZE);

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
  gracefulExit();
});

function gracefulExit() {
  debug(`Caster is settling DOWN`);
  if (mongoose.connection.readyState === 1) {
    mongoose.connection.close(() => {
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
}
