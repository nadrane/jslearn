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
    .then(movie => res.status(201).json(movie))
    .catch(next);
});

/*
* GET /api/movies/film/id - serve data + reviews for film by id
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
* DELETE /api/movies/film - delete film by id
*/
router.delete('/film/:id', (req, res, next) => {
  Movie.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).send())
    .catch(next);
});

/*
* PUT /api/movies/film - update film by id
*/
router.put('/film/:id', (req, res, next) => {
  const { id } = req.params;
  const { title, year, directorId } = req.body;
  Movie.update({ title, year, directorId }, { where: { id } })
    .then(() => Movie.findById(id, {
      include: [{ all: true, nested: true }],
      order: [[Review, 'createdAt', 'DESC']],
    }))
    .then(updatedMovie => res.status(200).json(updatedMovie))
    .catch(next);
});

/*
* POST api/movies/film/:id - add new review for film
*/
router.post('/film/:id', (req, res, next) => {
  Review.create(req.body, { fields: ['stars', 'comment', 'movieId', 'userId'] })
    .then(dbReturn => Review.findById(dbReturn.id, { include: [User] }))
    .then(newReview => res.status(201).json(newReview))
    .catch(next);
});

module.exports = router;
