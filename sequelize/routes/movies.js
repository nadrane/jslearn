const { roundedToFixed } = require('../helpers');
const express = require('express');
const { connection, models } = require('../db/index');

const router = express.Router();

// GET access movies view
router.get('/', (req, res, next) => {
  models.Movie.findAll({
    include: [{
      model: models.Director,
    }],
  }).then(movies => res.render('movies', { movies, session: req.session.sessionInfo }))
    .catch(err => next(err));
});

// GET access film view
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
      res.render('film', {
        movie: dbRes[0],
        reviews: dbRes[1],
        avg: roundedToFixed(dbRes[2], 1),
        session: req.session.sessionInfo,
      });
    }).catch(err => next(err));
});

// POST to film - add review
router.post('/film', (req, res, next) => {
  models.Review.create({
    stars: req.body.stars,
    comment: req.body.comment,
    movieMid: req.body.mid,
    reviewerUid: req.session.sessionInfo.uid,
  }).then(() => res.redirect('/'))
    .catch(e => next(e));
});

module.exports = router;
