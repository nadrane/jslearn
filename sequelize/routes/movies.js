const express = require('express');
const { models } = require('../db/index');

const router = express.Router();

router.get('/', (req, res, next) => {
  models.Movie.findAll().then(movies =>
    res.send(movies));
});

module.exports = router;
