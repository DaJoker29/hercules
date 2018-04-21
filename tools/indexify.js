/* eslint-disable import/no-dynamic-require */
const fs = require('fs');
const path = require('path');
const callsite = require('callsite');

function indexify(namespace) {
  const log = require('@tools/log')();
  const stack = callsite();
  const dir = path.dirname(stack[1].getFileName());
  const files = fs.readdirSync(dir);
  const result = {};

  files.forEach(file => {
    if (file === 'index.js') return;
    const value = file.slice(0, -3);
    const key = value.charAt(0).toUpperCase() + value.slice(1);

    result[key] = require(`${dir}/${value}`);
  });

  Object.getOwnPropertyNames(result).forEach(prop => {
    log(`${namespace}: ${prop}`);
  });
  return result;
}

module.exports = { indexify };
