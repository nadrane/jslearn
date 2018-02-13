const { roundedToFixed } = require('../helpers');
const express = require('express');
const { connection, models } = require('../db/index');

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
  const movieProm = models.Movie.findOne({
    where: { mid: req.query.id },
    include: [{
      model: models.Director,
    }],
  }).then((dbRes) => {
    if (!dbRes) {
      const uErr = new Error("Sorry! That film doesn't exist.");
      uErr.status = 404;
      throw uErr;
    } else return dbRes;
  });

  const reviewProm = models.Review.findAll({
    where: { movieMid: req.query.id },
    include: [{
      model: models.Reviewer,
    }],
  });

  const avgProm = models.Review.findAll({
    where: { movieMid: req.query.id },
    attributes: [[connection.fn('AVG', connection.col('reviews.stars')), 'avgValue']],
  }).then(dbRes => dbRes[0].dataValues.avgValue);

  Promise.all([movieProm, reviewProm, avgProm])
    .then((dbRes) => {
      res.render('film', { movie: dbRes[0], reviews: dbRes[1], avg: roundedToFixed(dbRes[2], 1) });
    }).catch(err => next(err));
});

module.exports = router;
