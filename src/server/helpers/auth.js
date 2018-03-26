module.exports.SERIALIZE = serializeUser;
module.exports.DESERIALIZE = deserializeUser;

function serializeUser(user, done) {
  return done(null, user._id);
}

function deserializeUser(id, done) {
  User.findById(id, (err, user) => done(err, user));
}
