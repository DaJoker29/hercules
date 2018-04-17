const debug = require('debug')('herc-config');

const pkg = require('../../package.json');
const Config = require('./config');
const Defaults = require('./defaults');

const config = (module.exports = Object.assign({ pkg }, Defaults, Config));

debug(`Configuring ${config.name}`);
debug(
  `Built using ${config.pkg.name.charAt(0).toUpperCase() +
    config.pkg.name.slice(1)}`,
);
debug(`Version ${config.pkg.version}`);
debug(`Crafted by ${config.pkg.author}`);
debug(`Repository: ${config.pkg.repository}`);
