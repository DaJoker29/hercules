#!/usr/bin/env node

const program = require('commander');
const { User } = require('@app/server/models');
const base32 = require('thirty-two');
const config = require('@app/config');
const db = require('@app/db_connect');

program
  .description(`CLI tool for the ${config.pkg.name.toUpperCase()} app`)
  .version(config.pkg.version);

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
          const uri = `otpauth://totp/${config.name.replace(/ /g, '')}${
            config.env === 'production' ? '' : '-' + config.env
          }:${user.username}?secret=${base32
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
    db.close();
  });

program.parse(process.argv);
