const { Strategy } = require('passport-local');
const VError = require('verror');
const notp = require('notp');

module.exports = new Strategy((email, password, done) => {
  const login = notp.totp.verify(password, process.env.ACCESS_KEY);

  if (!login) {
    return done(new VError('Incorrect Access Token'));
  }
  return done(null, {});
});
