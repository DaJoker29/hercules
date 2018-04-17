module.exports.ENSURE_AUTH = (req, res, next) => {
  if (
    '/login' === req.path ||
    req.path.includes('/assets/') ||
    req.isAuthenticated()
  ) {
    return next();
  }
  return res.redirect('/login');
};
