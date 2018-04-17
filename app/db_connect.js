const mongoose = require('mongoose');
const debug = require('debug')('herc-database');
const VError = require('verror');

const isProduction = process.env.NODE_ENV === 'production';
const db = isProduction ? process.env.DB : process.env.TEST_DB;

debug(`Connecting to database: ${db}`);
mongoose.connect(db);

mongoose.connection.on('error', err => {
  if (err) throw new VError(err, 'Problem connecting to database.');
});

mongoose.connection.on('disconnected', () => {
  debug('Disconnected from database.');
});

mongoose.connection.on('connected', () => {
  debug('Successfully connected to database.');
});

module.exports = mongoose.connection;
