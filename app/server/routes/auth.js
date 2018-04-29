const { Router } = require('express');
const passport = require('passport');

const router = Router();

router.get('/logout', logout);

router.get('/login', redirectToUsername);
router.get('/enter-username', enterUsername);
router.get('/enter-access-code', enterAccessCode);

router.post('/enter-username', redirectToAccessCode);
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
  }),
);

module.exports = router;

function enterAccessCode(req, res) {
  const { username } = req.query;
  res.render('enter-access-code', { username })
}

function redirectToUsername(req, res) {
  res.redirect('/enter-username');
}

function enterUsername(req, res) {
  res.render('enter-username');
}

function redirectToAccessCode(req, res) {
  const { username } = req.body;
  res.redirect(`/enter-access-code?username=${username}`);
}

function logout(req, res) {
  req.logout();
  res.redirect('/login');
}
