module.exports.RENDER_LOGIN = (req, res) => {
  res.render('login');
};

module.exports.LOGOUT = (req, res) => {
  req.logout();
  res.redirect('/login');
};
