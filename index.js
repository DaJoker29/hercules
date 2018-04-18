const http = require('http');
const dotenv = require('dotenv').config();
const debug = require('debug')('herc-launch');
const VError = require('verror');

/**
 * Check for env variables
 */

if (dotenv.error) {
  throw new VError(dotenv.error, 'Could not load environment variables');
} else {
  debug('Environment variables loaded from .env');
}

/**
 * Load config and app
 */

const config = require('@herc/config');
const db = require('@herc/db_connect');
const app = require('./app');

/**
 * Create/Launch Server
 */

const server = http.createServer(app);

server.on('error', onError);
server.on('listening', onListen);

db.on('connected', launchServer);

/**
 * Event Handlers
 */

function launchServer() {
  debug(`Launching server in ${config.env} mode`);
  server.listen(config.port);
}

function onError(e) {
  console.error(new VError(e, 'Problem launching server'));
}

function onListen() {
  debug(`${config.name} has spun up @ http://localhost:${config.port}`);
}

/**
 * Termination and Exit handling
 */

process.on('SIGINT', gracefulExit);
process.on('SIGTERM', gracefulExit);
process.on('uncaughtException', err => {
  console.error(err.stack);
  debug(`${config.name} has CRASHED in a whirl of fire...`);
  gracefulExit(1);
});

function gracefulExit(code = 0) {
  debug(`${config.name} is settling DOWN`);
  if (db.readyState === 1) {
    db.close(() => {
      process.exit(code);
    });
  } else {
    process.exit(code);
  }
}
