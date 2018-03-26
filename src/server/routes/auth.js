const { Router } = require('express');
const passport = require('passport');
const { Auth } = require('../controllers');

const router = Router();

router.get('/login', Auth.RENDER_LOGIN);
router.get('/logout', Auth.LOGOUT);

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
  }),
);

module.exports = router;
