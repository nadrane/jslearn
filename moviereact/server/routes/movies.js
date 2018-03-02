const { roundedToFixed } = require('../helpers');
const connection = require('../db/connect');
const express = require('express');
const {
  Director,
  Movie,
  Review,
  User,
} = require('../db/index');

const router = express.Router();

/*
* GET /api/movies - GET data for all movies
*/
router.get('/', (req, res, next) => {
  Movie.findAll({ include: [Director], order: [['year', 'ASC']] })
    .then(movies => res.json(movies))
    .catch(next);
});

/*
* POST /api/movies - add film
*/
router.post('/', (req, res, next) => {
  Movie.create(req.body, { fields: ['title', 'year', 'directorId'] })
    .then(dbRes =>
      Movie.findById(dbRes.id, { include: [Director] }))
    .then(movie => res.json(movie))
    .catch(next);
});

/*
* GET /api/movies/film - send data + reviews for one film
*/
router.get('/film/:id', (req, res, next) => {
  // retrieve movie and all reviews
  const movieProm = Movie.findById(req.params.id, {
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
    where: { movieId: req.params.id },
    attributes: [[connection.fn('AVG', connection.col('stars')), 'avgStars']],
  });

  Promise.all([movieProm, avgProm])
    .then(([movie, avg]) => {
      res.json({
        movie,
        avg: roundedToFixed(avg.get('avgStars'), 1),
      });
    })
    .catch(next);
});

/*
* POST api/movies/film/:id - add review
*/
router.post('/film/:id', (req, res, next) => {
  const {
    stars, comment, movieId, userId,
  } = req.body;
  console.log('received post!');
  Review.create({
    stars,
    comment,
    movieId,
    userId,
  })
    .then(dbReturn =>
      Review.findById(dbReturn.id, {
        include: [User],
      }))
    .then(newRow => res.json(newRow))
    .catch(next);
});

module.exports = router;
