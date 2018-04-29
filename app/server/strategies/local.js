const { Strategy } = require('passport-local');
const VError = require('verror');
const { User } = require('@app/server/models');
const notp = require('notp');

module.exports = new Strategy((username, password, done) => {
  User.findOne({ username })
    .then(user => {
      const login = notp.totp.verify(password, user.token);
      if (login) {
        return done(null, user);
      }
      return done(null, false);
    })
    .catch(e => done(new VError(e, 'Problem processing access token')));
});
