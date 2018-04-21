#!/usr/bin/env node
const fs = require('fs');
const { resolve } = require('path');

console.log('\nStart of POSTINSTALL\n');

const symlinks = [
  [resolve(__dirname, '../app/'), resolve(__dirname, '../node_modules/@herc')],
  [resolve(__dirname), resolve(__dirname, '../node_modules/@tools')],
  [
    resolve(__dirname, 'pre-commit.sh'),
    resolve(__dirname, '../.git/hooks/pre-commit'),
  ],
];

console.log(`-Creating ${symlinks.length} symlinks...`);

symlinks.forEach(([target, path]) => {
  if (fs.existsSync(path)) {
    console.log(`--Link already exists: ${path}`);
  } else {
    fs.symlinkSync(target, path, 'junction');
    console.log(`--Symlink created: ${target} -> ${path}`);
  }
});

console.log('\nEnd of POSTINSTALL\n');
