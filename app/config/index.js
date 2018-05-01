const { existsSync } = require('fs');
const { resolve } = require('path');
const log = require('@tools/log')();

const merge = require('deepmerge');
const VError = require('verror');
const pkg = require('../../package.json');
const defaults = require('./defaults');

const configPath = resolve(__dirname, '../../config.js');

if (!existsSync(configPath)) {
  throw new VError('No site configuration found');
}

const site = require(configPath);
const env = require(`./${process.env.NODE_ENV || 'development'}`);

const configuration = merge.all([
  env,
  JSON.parse(JSON.stringify(defaults)),
  JSON.parse(JSON.stringify(site))
]);

const config = (module.exports = Object.assign({ pkg }, configuration));

log(
  `Configuring ${config.name.toTitleCase()} (${config.env.toTitleCase()} mode)`
);
log(`Built using ${config.pkg.name.toTitleCase()}`);
log(`Version ${config.pkg.version}`);
log(`Crafted by ${config.pkg.author}`);
log(`Repository: ${config.pkg.repository}`);
