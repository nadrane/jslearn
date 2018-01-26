const express = require('express');
const fs = require('fs');
const helpers = require('../helpers.js');
const tweets = require('../tweets.json');
const users = require('../users.json');

const router = express.Router();

/* GET tweets root (all-tweets view) */
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
