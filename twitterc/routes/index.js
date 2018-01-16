const express = require('express');
const router = express.Router();
const fs = require('fs');

const tweets = JSON.parse(fs.readFileSync('tweets.json'));

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { tweets: tweets });
});

module.exports = router;

/*
* Questions
*/

// what does bin/www do? To what extent/depth level should I be comfortable with configuring that?
// same for app.js
// why do we launch in console with DEBUG=twitterc:* npm start ?
