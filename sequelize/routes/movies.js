const { roundedToFixed, timestamp } = require('../helpers');
const express = require('express');
const { connection, models } = require('../db/index');

const router = express.Router();

router.get('/', (req, res, next) => {
  Promise.all([
    models.Movie.findAll({ include: [{ model: models.Director }], order: [['year', 'ASC']] }),
    models.Director.findAll({ order: [['did', 'ASC']] }),
  ])
    .then(([movies, directors]) => {
      res.render('movies', {
        movies,
        directors,
        session: req.session.sessionInfo,
      });
    })
    .catch(err => next(err));
});

/*
* POST /movies - add film
*/
router.post('/', (req, res, next) => {
  models.Movie.create({
    title: req.body.title,
    year: req.body.year,
    directorDid: req.body.did,
  })
    .then(() => res.redirect('/'))
    .catch(err => next(err));
});

/*
* GET /movies/film - profile view - clean this up
*/
router.get('/film', (req, res, next) => {
  // retrieve movie info if exists
  const movieProm = models.Movie.findOne({
    where: { mid: req.query.id },
    include: [
      { model: models.Director },
      { model: models.Review, include: [{ model: models.Reviewer }] },
    ],
    order: [[models.Review, 'createdAt', 'DESC']],
  })
    .then((dbRes) => {
      if (!dbRes) {
        const uErr = new Error("Sorry! That film doesn't exist.");
        uErr.status = 404;
        throw uErr;
      } else {
        dbRes.reviews.map(timestamp);
        return dbRes;
      }
    });

  // retrieve avg score for this movie
  const avgProm = models.Review.findOne({
    where: { movieMid: req.query.id },
    attributes: [[connection.fn('AVG', connection.col('reviews.stars')), 'avgValue']],
  }).then(dbRes => dbRes.dataValues.avgValue);

  // resolve once all info available
  Promise.all([movieProm, avgProm])
    .then(([movie, avg]) => {
      res.render('film', {
        movie,
        reviews: movie.reviews,
        avg: roundedToFixed(avg, 1),
        session: req.session.sessionInfo,
      });
    })
    .catch(err => next(err));
});

/*
* POST /movies/film - add review
*/
router.post('/film', (req, res, next) => {
  models.Review.create({
    stars: req.body.stars,
    comment: req.body.comment,
    movieMid: req.body.mid,
    reviewerUid: req.session.sessionInfo.uid,
  }).then(() => res.redirect(`/movies/film?id=${req.body.mid}`))
    .catch(err => next(err));
});

module.exports = router;
