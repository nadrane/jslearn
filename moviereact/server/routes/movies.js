const express = require('express');
const {
  Director, Movie, Review, User,
} = require('../db/index');

const router = express.Router();

/*
* GET /api/movies - serve data for all movies
*/
router.get('/', (req, res, next) => {
  Movie.findAll({ include: [Director], order: [['year', 'ASC']] })
    .then(movies => res.json(movies))
    .catch(next);
});

/*
* POST /api/movies - add new film
*/
router.post('/', (req, res, next) => {
  Movie.create(req.body, { fields: ['title', 'year', 'directorId'] })
    .then(dbRes => Movie.findById(dbRes.id, { include: [Director] }))
    .then(movie => res.json(movie))
    .catch(next);
});

/*
* GET /api/movies/film - serve data + reviews for one film
*/
router.get('/film/:id', (req, res, next) => {
  Movie.findById(req.params.id, {
    include: [{ all: true, nested: true }],
    order: [[Review, 'createdAt', 'DESC']],
  })
    .then(movie => (movie ? res.json({ movie }) : res.status(404).send()))
    .catch(next);
});

/*
* POST api/movies/film/:id - add new review for film
*/
router.post('/film/:id', (req, res, next) => {
  Review.create(req.body, { fields: ['stars', 'comment', 'movieId', 'userId'] })
    .then(dbReturn => Review.findById(dbReturn.id, { include: [User] }))
    .then(newRow => res.json(newRow))
    .catch(next);
});

module.exports = router;
