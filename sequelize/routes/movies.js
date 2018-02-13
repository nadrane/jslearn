const express = require('express');
const { models } = require('../db/index');

const router = express.Router();

router.get('/', (req, res, next) => {
  models.Movie.findAll({
    include: [{
      model: models.Director,
    }],
  }).then(movies => res.render('movies', { movies }))
    .catch(err => next(err));
});

router.get('/film', (req, res, next) => {
  models.Movie.findOne({
    where: { mid: req.query.id },
    include: [{
      model: models.Director,
    }],
  })
    .then(movie => res.render('film', { movie }))
    .catch(err => next(err));
});

module.exports = router;
