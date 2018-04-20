const debug = require('debug')('herc-config');

const merge = require('deepmerge');
const pkg = require('../../package.json');
const site = require('./config');
const defaults = require('./defaults');

const env = require(`./${process.env.NODE_ENV || 'development'}`);

const config = (module.exports = merge.all([
  { pkg },
  env,
  JSON.parse(JSON.stringify(defaults)),
  JSON.parse(JSON.stringify(site)),
]));

debug(`Configuring ${config.name.toUpperCase()}(${config.env} mode)`);
debug(
  `Built using ${config.pkg.name.charAt(0).toUpperCase() +
    config.pkg.name.slice(1)}`,
);
debug(`Version ${config.pkg.version}`);
debug(`Crafted by ${config.pkg.author}`);
debug(`Repository: ${config.pkg.repository}`);
