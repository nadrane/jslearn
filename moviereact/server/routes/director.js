const express = require('express');
const { Director, Movie } = require('../db/index');

const router = express.Router();

/*
* GET /api/director - get all directors
*/
router.get('/', (req, res, next) => {
  Director.findAll({ order: [['id', 'ASC']] })
    .then(directors => res.json({ directors }))
    .catch(next);
});

/*
* GET /api/director/:id - get data and movies for single director
*/
router.get('/:id', (req, res, next) => {
  Director.findById(req.params.id, { include: [Movie], order: [[Movie, 'year', 'ASC']] })
    .then(director => (director ? res.json({ director }) : res.status(404).send()))
    .catch(next);
});

/*
* POST /api/director - add new director
*/
router.post('/', (req, res, next) => {
  Director.create(req.body, { fields: ['name'] })
    .then(director => res.json(director))
    .catch(next);
});

module.exports = router;
