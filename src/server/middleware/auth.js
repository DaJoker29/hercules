module.exports.ENSURE_AUTH = (req, res, next) => {
  if ('/login' === req.path || req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};
