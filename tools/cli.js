#!/usr/bin/env node

const program = require('commander');
const { User } = require('@herc/models');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const base32 = require('thirty-two');
const pkg = require('../package.json');

dotenv.config();

program
  .description(`CLI tool for the ${pkg.name.toUpperCase()} app`)
  .option('-d, --dev', 'Launch in dev mode')
  .version(pkg.version);

program
  .command('user [cmd]')
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

    // Generate QR Code for Authenticator
    if ('qr' === cmd) {
      const { username } = options;

      await User.findOne({ username })
        .then(user => {
          const uri = `otpauth://totp/Herc:${user.username}?secret=${base32
            .encode(user.token)
            .toString()
            .replace(/=/g, '')}`;

          console.log(
            `QR Code: https://chart.googleapis.com/chart?chs=166x166&chld=L|0&cht=qr&chl=${uri}`,
          );
        })
        .catch(e => console.error(e.message));
    }

    // Print totp
    if ('totp' === cmd) {
      const { username } = options;

      await User.findOne({ username })
        .then(user => {
          const notp = require('notp');
          console.log(
            `Access Code (valid for 30sec): ${notp.totp.gen(user.token)}`,
          );
        })
        .catch(e => console.error(e.message));
    }

    if (!cmd || 'list' === cmd) {
      await User.find({})
        .then(users => {
          const notp = require('notp');
          users.forEach(user => {
            console.log(
              `${user.username} - ${user.email}\n Access Code: ${notp.totp.gen(
                user.token,
              )}\n`,
            );
          });
        })
        .catch(e => console.error(e.message));
    }

    //////////////////////////////
    // Disconnect from Database //
    //////////////////////////////
    mongoose.connection.close();
  });

program.parse(process.argv);
