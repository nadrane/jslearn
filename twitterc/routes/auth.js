const express = require('express');
const { Client, connectionString } = require('../db/index');

// router and db config
const router = express.Router();

/* GET login */
router.get('/login', (req, res) => {
  res.render('access');
});

/* POST to login - set user session */
router.post('/login', (req, res, next) => {
  const client = new Client({ connectionString });
  client.connect();
  client.query('SELECT DISTINCT * FROM users WHERE handle = $1', [req.body.user])
    .then((dbRes) => {
      if (res.rows.length === 0) {
        res.redirect('/auth/login');
      } else {
        [req.session.sessionUser] = dbRes.rows;
        res.redirect('/');
      }
      client.end();
    })
    .catch(e => next(e));
});

/* GET logout */
router.get('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
});

/* GET register */
router.get('/register', (req, res) => {
  res.render('access', { register: true });
});

/* POST to register - write new user and set session */
router.post('/register', (req, res, next) => {
  const queryText = 'INSERT INTO users(fname, lname, handle) VALUES($1, $2, $3) RETURNING *';
  const queryVals = [req.body.fname, req.body.lname, req.body.user];
  const client = new Client({ connectionString });
  client.connect();
  client.query(queryText, queryVals, (err, dbRes) => {
    if (err) return next(err);
    [req.session.sessionUser] = dbRes.rows;
    res.redirect('/');
    client.end();
  });
});

module.exports = router;
