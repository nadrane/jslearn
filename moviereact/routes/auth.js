const express = require('express');
const { User } = require('../db/index');

const router = express.Router();

/* GET login */
router.get('/login', (req, res) => {
  res.render('access');
});

/* POST to login - set user session */
router.post('/login', (req, res, next) => {
  User.findOne({
    where: { username: req.body.username },
  }).then((user) => {
    if (!user) {
      return res.redirect('/auth/login');
    }
    req.session.sessionInfo = {
      uid: user.id,
      username: user.username,
    };
    return res.redirect('/');
  }).catch(next);
});

/* GET logout */
router.get('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    return res.redirect('/');
  });
});

/* GET register */
router.get('/register', (req, res) => {
  res.render('access', { register: true });
});

/* POST to register - write new user and set session */
router.post('/register', (req, res, next) => {
  if (!req.body.username) {
    return res.redirect('/auth/register');
  }
  return User.create(req.body, { fields: ['username'] })
    .then((user) => {
      req.session.sessionInfo = {
        uid: user.id,
        username: user.username,
      };
      return res.redirect('/');
    })
    .catch(next);
});

module.exports = router;
