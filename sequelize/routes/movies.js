const { roundedToFixed } = require('../helpers');
const connection = require('../db/connect');
const express = require('express');
const {
  Director,
  Movie,
  Review,
} = require('../db/index');

const router = express.Router();

router.get('/', (req, res, next) => {
  Promise.all([
    Movie.findAll({ include: [Director], order: [['year', 'ASC']] }),
    Director.findAll({ order: [['id', 'ASC']] }),
  ])
    .then(([movies, directors]) => {
      res.render('movies', {
        movies,
        directors,
        session: req.session.sessionInfo,
      });
    })
    .catch(next);
});

/*
* POST /movies - add film
*/
router.post('/', (req, res, next) => {
  Movie.create(req.body, { fields: ['title', 'year', 'directorId'] })
    .then(() => res.redirect('/'))
    .catch(next);
});

/*
* GET /movies/film - profile view - clean this up
*/
router.get('/film', (req, res, next) => {
  // retrieve movie and all reviews
  const movieProm = Movie.findById(req.query.id, {
    include: [{ all: true, nested: true }],
    order: [[Review, 'createdAt', 'DESC']],
  })
    .then((dbRes) => {
      if (!dbRes) {
        const uErr = new Error("Sorry! That film doesn't exist.");
        uErr.status = 404;
        throw uErr;
      }
      return dbRes;
    });

  // retrieve avg score for this movie
  const avgProm = Review.findOne({
    where: { movieId: req.query.id },
    attributes: [[connection.fn('AVG', connection.col('stars')), 'avgStars']],
  });

  // resolve once all info available
  Promise.all([movieProm, avgProm])
    .then(([movie, avg]) => {
      res.render('film', {
        movie,
        avg: roundedToFixed(avg.get('avgStars'), 1),
        session: req.session.sessionInfo,
      });
    })
    .catch(next);
});

/*
* POST /movies/film - add review
*/
router.post('/film', (req, res, next) => {
  Review.create({
    stars: req.body.stars,
    comment: req.body.comment,
    movieId: req.body.movieId,
    userId: req.session.sessionInfo.uid,
  }).then(() => res.redirect(`/movies/film?id=${req.body.movieId}`))
    .catch(next);
});

// scratch
router.get('/d', (req, res, next) => {
  Promise.all([Movie.findById(1), Director.findById(1)])
    .then(([movie, director]) => {
      movie.setDirector(director);
    })
  // Review.findOne({ attributes: [[connection.fn('AVG', connection.col('stars')), 'avgStars']] })
    .then((dbres) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(dbres, null, 3));
    })
    .catch(next);
});

module.exports = router;
