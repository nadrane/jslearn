const express = require('express');
const fs = require('fs');
const users = require('../users.json');

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
  const newId = users.length;
  const newUser = {
    id: newId,
    fname: req.body.fname,
    lname: req.body.lname,
    handle: req.body.user,
  };
  users.push(newUser);
  fs.writeFile('users.json', JSON.stringify(users), (err) => {
    if (err) throw err;
    req.session.sessionUser = newUser;
    res.redirect('/');
  });
});

module.exports = router;
