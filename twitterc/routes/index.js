const express = require('express');
const fs = require('fs');
const tweets = require('../tweets.json');
const users = require('../users.json');

const router = express.Router();

/* GET login */
router.get('/login', (req, res) => {
  res.render('access', { users });
});

/* POST to login - set user session */
router.post('/login', (req, res) => {
  req.session.user_id = parseInt(req.body.user_id, 10);
  res.redirect('/');
});

/* GET register */
router.get('/register', (req, res) => {
  res.render('access', { users, register: true });
});

/* POST to register - write new user and set session */
router.post('/register', (req, res) => {
  const newId = users.length;
  users.push({
    id: newId,
    fname: req.body.fname,
    lname: req.body.lname,
    handle: req.body.user,
  });
  fs.writeFile('users.json', JSON.stringify(users), (err) => {
    if (err) throw err;
    req.session.user_id = newId;
    res.redirect('/');
  });
});

/* GET root */
router.get('/', (req, res) => {
  let sessionID = false;
  if (req.session.user_id !== undefined) {
    sessionID = req.session.user_id;
  }
  res.render('index', { tweets, users, sessionID });
});

/* POST to root - submit tweet */
router.post('/', (req, res) => {
  tweets.unshift({
    u_id: parseInt(req.session.user_id, 10),
    datetime: 1,
    text: req.body.tweetbox,
  });
  fs.writeFile('tweets.json', JSON.stringify(tweets), (err) => {
    if (err) throw err;
    res.redirect('/');
  });
});

/* GET user view */
router.get('/user', (req, res) => {
  let sessionID = false;
  if (req.session.user_id !== undefined) {
    sessionID = req.session.user_id;
  }
  // user lookup
  const user = users[req.query.id];
  const userTweets = tweets.filter(tweet =>
    parseInt(tweet.u_id, 10) === parseInt(req.query.id, 10));
  res.render('user', {
    tweets: userTweets, users, user, sessionID,
  });
});

// /* GET root */
// router.get('/', (req, res) => {
//   fs.readFile('tweets.json', (err, data) => {
//     if (err) throw err;
//     res.render('index', { tweets: JSON.parse(data) });
//   });
// });

// /* POST to root - submit tweet */
// router.post('/', (req, res) => {
//   fs.readFile('tweets.json', (err, data) => {
//     if (err) throw err;
//     const newtweets = JSON.parse(data);
//     newtweets.unshift({
//       u_id: 2,
//       handle: 'zucky',
//       datetime: 1,
//       text: req.body.tweetbox,
//     });
//     fs.writeFile('tweets.json', JSON.stringify(newtweets), (writeerr) => {
//       if (writeerr) throw writeerr;
//       res.redirect('/');
//     });
//   });
// });

// /* GET user view */
// router.get('/user', (req, res) => {
//   // user lookup
//   fs.readFile('users.json', (err, data) => {
//     if (err) throw err;
//     const users = JSON.parse(data);
//     const user = users[req.query.id];
//     fs.readFile('tweets.json', (readerr, readdata) => {
//       if (readerr) throw readerr;
//       const tweets = JSON.parse(readdata)
//         .filter(tweet => tweet.u_id === parseInt(req.query.id, 10));
//       res.render('user', { tweets, user });
//     });
//   });
// });

module.exports = router;

/*
* Questions
*/

// what does bin/www do? To what extent/depth level should I be comfortable with configuring that?
// same for app.js
// why do we launch in console with DEBUG=twitterc:* npm start ?
// in this file, is the read to tweets.JSON happening every time a GET request is submitted?
// is it sloppy to have nested asynch calls (e.g. 2 readFile calls)

// best practices for accessing JS vars from server in client?
// // used <script>var users = {{ users | dump | safe }};</script> but unsure how dump+safe work
