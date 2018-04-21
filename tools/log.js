const path = require('path');
const debug = require('debug');
const callsite = require('callsite');
const pkg = require('../package.json');

module.exports = namespace => {
  if (namespace) {
    return debug(`${pkg.name}-${namespace}`);
  } else {
    const stack = callsite();
    const file = stack[1].getFileName();
    const filename = file
      .slice(file.lastIndexOf('/') + 1, -3)
      .replace(/_/g, '-');
    const home = `${path.resolve(__dirname, '..')}`;
    const dir = path.dirname(file);
    const parents = dir
      .replace(home, '')
      .replace(/^\//g, '')
      .replace(/\//g, '-');

    // Project Entry Point
    if (filename === 'index' && dir === home) {
      return debug(`${pkg.name}`);
    } else if (filename === 'index') {
      return debug(`${pkg.name}-${parents}`);
    } else {
      return debug(`${pkg.name}-${parents}-${filename}`);
    }
  }
};
