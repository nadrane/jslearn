const express = require('express');
const fs = require('fs');
const helpers = require('../helpers.js');
const tweets = require('../tweets.json');
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

/* GET root */
router.get('/', (req, res) => {
  res.render('index', {
    tweets: helpers.timeAgo(tweets),
    users,
    session: req.session.sessionUser,
    currentTime: Date.now(),
  });
});

/* POST to root - submit tweet */
router.post('/', (req, res) => {
  tweets.unshift({
    u_id: req.session.sessionUser.id,
    dateTime: Date.now(),
    text: req.body.tweetbox,
  });
  fs.writeFile('tweets.json', JSON.stringify(tweets), (err) => {
    if (err) throw err;
    res.redirect('/');
  });
});

/* GET user view */
router.get('/user', (req, res) => {
  const user = users[req.query.id];
  const userTweets = tweets.filter(tweet =>
    parseInt(tweet.u_id, 10) === parseInt(req.query.id, 10));
  res.render('user', {
    tweets: helpers.timeAgo(userTweets),
    user,
    session: req.session.sessionUser,
    currentTime: Date.now(),
  });
});

module.exports = router;

/*
* Questions
*/

// Think I need more depth on Express - self-config vs. generator, app.js
// Want to understand bin/www -- to what extent/depth should I be able to know/manipulate
// Session+cookies configuration, best practices + resources
// More general Q's about server stuff - next() and err handling
// Why do we launch in console with DEBUG=twitterc:* npm start ?
// In this file, is the read to tweets.JSON happening every time a GET request is submitted?
// Is it sloppy to have nested asynch calls (e.g. 2 readFile calls - see below)
// Best practices for accessing JS vars from server in client?
// >> I used <script>var users = {{ users | dump | safe }}; Do w/ Ajax? Nunjucks?

/*
* Old + for reference
*/

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
//       dateTime: 1,
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
