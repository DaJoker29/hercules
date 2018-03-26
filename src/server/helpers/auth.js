module.exports.SERIALIZE = serializeUser;
module.exports.DESERIALIZE = deserializeUser;

function serializeUser(user, done) {
  return done(null, '1234');
}

function deserializeUser(id, done) {
  done(null, { id: '1234' });
}
