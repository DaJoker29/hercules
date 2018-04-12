const { Router } = require('express');
const passport = require('passport');

const router = Router();

router.get('/login', renderLogin);
router.get('/logout', logout);

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/login',
  }),
);

module.exports = router;

function renderLogin(req, res) {
  res.render('login');
}

function logout(req, res) {
  req.logout();
  res.redirect('/login');
}
