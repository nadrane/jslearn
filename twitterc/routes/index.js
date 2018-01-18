const express = require('express');
const fs = require('fs');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
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
// in this file, is the read to tweets.JSON happening every time a GET request is submitted?
