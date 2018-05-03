const { Router } = require('express');
const log = require('@tools/log')();
const jwt = require('jsonwebtoken');
const passport = require('passport');

const router = Router();

router.post('/login', loginHandler);

module.exports = router;

function loginHandler(req, res) {
  passport.authenticate('local', { session: false }, function(err, user, info) {
    if (err || !user) {
      if (err) {
        log(err);
      }

      return res.status(400).json({
        message: info ? info.message : 'Login Failed',
        user
      });
    }

    req.login(user, { session: false }, err => {
      if (err) {
        res.send(err);
      }

      console.log(typeof user);
      const { _id: id } = user;

      const token = jwt.sign({ id }, 'somesecret');

      return res.json({ id, token });
    });
  })(req, res);
}
