const express = require('express');
const users = require('../users.json');
const { Client } = require('pg');

const router = express.Router();

/* GET login */
router.get('/login', (req, res) => {
  res.render('access', { users });
});

/* POST to login - set user session */
router.post('/login', (req, res) => {
  req.session.sessionUser = users[req.body.user_id];
  res.redirect('/');
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
  res.render('access', { users, register: true });
});

/* POST to register - write new user and set session */
router.post('/register', (req, res) => {
  const queryText = 'INSERT INTO users(fname, lname, handle) VALUES($1, $2, $3)';
  const queryVals = [req.body.fname, req.body.lname, req.body.user];
  const client = new Client();
  client.connect();
  client.query(queryText, queryVals, (err) => {
    if (err) throw err;
    client.end();
  });
  req.session.sessionUser = 666;
  res.redirect('/');
});

module.exports = router;
