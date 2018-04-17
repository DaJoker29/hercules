const http = require('http');
const dotenv = require('dotenv').config();
const debug = require('debug')('herc-launch');
const env = require('debug')('herc-env');
const VError = require('verror');
const config = require('@herc/config');
const db = require('@herc/db_connect');
const app = require('./app');

/**
 * Check for envirnment variables
 */

if (dotenv.error) {
  throw new VError(dotenv.error, 'Could not load environment variables');
} else {
  Object.entries(dotenv.parsed).forEach(rule => {
    env(`${rule[0]} = ${rule[1]}`);
  });
}

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
  debug('Launching server');
  server.listen(process.env.PORT);
}

function onError(e) {
  console.error(new VError(e, 'Problem launching server'));
}

function onListen() {
  debug(
    `${config.name} has spun up @ http://${process.env.HOST}:${
      process.env.PORT
    }`,
  );
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
