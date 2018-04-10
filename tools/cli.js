#!/usr/bin/env node

const program = require('commander');
const { User } = require('@herc/models');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const pkg = require('../package.json');

dotenv.config();

program
  .description(`CLI tool for the ${pkg.name.toUpperCase()} app`)
  .option('-d, --dev', 'Launch in dev mode')
  .version(pkg.version);

program
  .command('user <cmd>')
  .description('Handle User Data')
  .alias('u')
  .option('-u, --username <username>', 'Username')
  .option('-e, --email <email>', 'Email Address')
  .option('-n, --displayName [displayName]', 'Display Name')
  .action(async (cmd, options) => {
    /////////////////////////
    // Connect to database //
    /////////////////////////
    mongoose.connect(program.dev ? process.env.TEST_DB : process.env.DB);

    // Create User
    if ('create' === cmd) {
      const { username, email, displayName } = options;

      await User.create({ username, email, displayName })
        .then(doc => {
          console.log(doc);
        })
        .catch(e => console.error(e.message));
    }

    //////////////////////////////
    // Disconnect from Database //
    //////////////////////////////
    mongoose.connection.close();
  });

program.parse(process.argv);
