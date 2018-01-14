const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'David M' });
});

module.exports = router;

/*
* Questions
*/

// what does bin/www do? To what extent/depth level should I be comfortable with configuring that?
// same for app.js
// why do we launch in console with DEBUG=twitterc:* npm start ?
