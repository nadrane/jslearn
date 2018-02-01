const express = require('express');
const { Client } = require('pg');

const router = express.Router();

/* GET login */
router.get('/login', (req, res) => {
  res.render('access');
});

/* POST to login - set user session */
router.post('/login', (req, res) => {
  const queryText = 'SELECT DISTINCT * FROM users WHERE handle = $1';
  const queryVals = [req.body.user];
  const client = new Client();
  client.connect();
  client.query(queryText, queryVals, (err, dbRes) => {
    if (err) throw err;
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
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect('/');
  });
});

/* GET register */
router.get('/register', (req, res) => {
  res.render('access', { register: true });
});

/* POST to register - write new user and set session */
router.post('/register', (req, res) => {
  const queryText = 'INSERT INTO users(fname, lname, handle) VALUES($1, $2, $3) RETURNING *';
  const queryVals = [req.body.fname, req.body.lname, req.body.user];
  const client = new Client();
  client.connect();
  client.query(queryText, queryVals, (err, dbRes) => {
    if (err) throw err;
    [req.session.sessionUser] = dbRes.rows;
    // console.log('the new session user is: ', req.session.sessionUser);
    // console.log('the new session id is: ', req.session.sessionUser.uid);
    res.redirect('/');
    client.end();
  });
});

module.exports = router;
