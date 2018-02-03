const express = require('express');
const { Client } = require('pg');

// router and db config
const router = express.Router();
const connectionString = 'postgresql://machajew:twitterc@localhost:5432/twitterc';

/* GET login */
router.get('/login', (req, res) => {
  res.render('access');
});

/* POST to login - set user session */
router.post('/login', (req, res, next) => {
  const queryText = 'SELECT DISTINCT * FROM users WHERE handle = $1';
  const queryVals = [req.body.user];
  const client = new Client({ connectionString });
  client.connect();
  client.query(queryText, queryVals, (err, dbRes) => {
    if (err) return next(err);
    if (dbRes.rows.length === 0) {
      res.redirect('/auth/login');
    } else {
      [req.session.sessionUser] = dbRes.rows;
      res.redirect('/');
    }
    client.end();
  });
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
