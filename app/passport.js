const passport = require('passport');
const { ExtractJwt, Strategy: JWTStrategy } = require('passport-jwt');
const { Strategy: LocalStrategy } = require('passport-local');
const { User } = require('@app/server/models');
const notp = require('notp');

passport.use(
  new LocalStrategy(async function(username, password, cb) {
    try {
      const user = await User.findOne({ username });
      const login = notp.totp.verify(password, user.token);

      if (login) {
        return cb(null, user, { message: 'Login was successful' });
      }
      return cb(null, false, { message: 'No user found' });
    } catch (e) {
      return cb(e, null, { message: 'There was an error' });
    }
  })
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'somesecret'
    },

    async function(payload, cb) {
      try {
        const user = await User.findOne({ _id: payload.id });
        return cb(null, user);
      } catch (e) {
        return cb(e);
      }
    }
  )
);
