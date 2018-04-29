#!/usr/bin/env node
const { resolve } = require('path');
const fs = require('fs-extra');

console.log('\nStart of PREINSTALL\n');

const symlinks = [
  resolve(__dirname, '../node_modules/@app'),
  resolve(__dirname, '../node_modules/@tools'),
];

console.log(`-Removing ${symlinks.length} symlinks from node_modules...`);

symlinks.forEach(symlink => {
  if (fs.existsSync(symlink)) {
    fs.unlinkSync(symlink);
    console.log(`--Deleted symlink ${symlink}`);
  } else {
    console.log(`--Symlink not found: ${symlink}`);
  }
});

console.log('\nEnd of PREINSTALL\n');
