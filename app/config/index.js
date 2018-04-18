const debug = require('debug')('herc-config');

const pkg = require('../../package.json');
const site = require('./config');
const defaults = require('./defaults');

const env = require(`./${process.env.NODE_ENV || 'development'}`);

const config = (module.exports = Object.assign({ pkg }, env, defaults, site));

debug(`Configuring ${config.name.toUpperCase()}(${config.env} mode)`);
debug(
  `Built using ${config.pkg.name.charAt(0).toUpperCase() +
    config.pkg.name.slice(1)}`,
);
debug(`Version ${config.pkg.version}`);
debug(`Crafted by ${config.pkg.author}`);
debug(`Repository: ${config.pkg.repository}`);
