const express = require('express');
const fs = require('fs');

const router = express.Router();

/* GET users view. */
router.get('/', (req, res) => {
  fs.readFile('tweets.json', (err, rawtweets) => {
    if (err) throw err;
    const tweets = JSON.parse(rawtweets);
    fs.readFile('users.json', (usererr, rawusers) => {
      if (usererr) throw usererr;
      const users = JSON.parse(rawusers);
      res.render('user', { tweets, user: users[0] });
    });
  });
});

module.exports = router;
