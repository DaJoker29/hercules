const log = require('@tools/log')();

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

log(`Configuring ${config.name.toUpperCase()}(${config.env} mode)`);
log(
  `Built using ${config.pkg.name.charAt(0).toUpperCase() +
    config.pkg.name.slice(1)}`,
);
log(`Version ${config.pkg.version}`);
log(`Crafted by ${config.pkg.author}`);
log(`Repository: ${config.pkg.repository}`);
