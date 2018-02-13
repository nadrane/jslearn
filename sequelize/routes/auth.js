const express = require('express');

// router and db config
const router = express.Router();

/* GET login */
router.get('/login', (req, res) => {
  res.render('access');
});

/* POST to login - set user session */


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


module.exports = router;
