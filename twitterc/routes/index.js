const express = require('express');
const router = express.Router();
const fs = require('fs');

/* GET home page. */
router.get('/', (req, res, next) => {
  fs.readFile('tweets.json', (err, data) => {
    if (err) throw err;
    res.render('index', { tweets: JSON.parse(data) });
  });
});

module.exports = router;

/*
* Questions
*/

// what does bin/www do? To what extent/depth level should I be comfortable with configuring that?
// same for app.js
// why do we launch in console with DEBUG=twitterc:* npm start ?
// in this current file, when I read from my tweets.JSON, is that read happening every time a GET request is submitted?
