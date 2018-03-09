const express = require('express');
const {
  Director, Movie, Review, User,
} = require('../db/index');

const router = express.Router();

router.get('/', (req, res, next) => {
  Movie.findAll({ include: [Director], order: [['year', 'ASC']] })
    .then(movies => res.json(movies))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Movie.create(req.body, { fields: ['title', 'year', 'directorId'] })
    .then(dbRes => Movie.findById(dbRes.id, { include: [Director] }))
    .then(movie => res.status(201).json(movie))
    .catch(next);
});

router.get('/film/:id', (req, res, next) => {
  Movie.findById(req.params.id, {
    include: [{ all: true, nested: true }],
    order: [[Review, 'createdAt', 'DESC']],
  })
    .then(movie => (movie ? res.json({ movie }) : res.status(404).send()))
    .catch(next);
});

router.post('/film/:id', (req, res, next) => {
  Review.create(req.body, { fields: ['stars', 'comment', 'movieId', 'userId'] })
    .then(dbReturn => Review.findById(dbReturn.id, { include: [User] }))
    .then(newReview => res.status(201).json(newReview))
    .catch(next);
});

router.delete('/film/:id', (req, res, next) => {
  Movie.destroy({ where: { id: req.params.id } })
    .then(() => res.send())
    .catch(next);
});

router.put('/film/:id', (req, res, next) => {
  const { id } = req.params;
  const { title, year, directorId } = req.body;
  Movie.update({ title, year, directorId }, { where: { id } })
    .then(() => Movie.findById(id, {
      include: [{ all: true, nested: true }],
      order: [[Review, 'createdAt', 'DESC']],
    }))
    .then(updatedMovie => res.json(updatedMovie))
    .catch(next);
});

module.exports = router;
