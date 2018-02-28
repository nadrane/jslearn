const express = require('express');
const { Director, Movie } = require('../db/index');

const router = express.Router();

/*
* GET /api/director/:id - send data for individual director profile
*/
router.get('/:id', (req, res, next) => {
  Director.findById(req.params.id, { include: [Movie], order: [[Movie, 'year', 'ASC']] })
    .then((director) => {
      if (!director) {
        // look into err handling
        // const uErr = new Error("Sorry! That director doesn't exist.");
        // uErr.status = 404;
        // throw uErr;
      }
      res.json({
        director,
        count: director.movies.length,
      });
    })
    .catch(next);
});

/*
* GET /api/director - send data for all directors
*/
router.get('/', (req, res, next) => {
  Director.findAll({ order: [['id', 'ASC']] })
    .then((directors) => {
      res.json({
        directors,
      });
    })
    .catch(next);
});

/*
* POST /api/director - add new director
*/
router.post('/', (req, res, next) => {
  if (!req.body.name) {
    return res.redirect('/');
  }
  return Director.create(req.body, { fields: ['name'] })
    .then(() => res.redirect('/'))
    .catch(next);
});

module.exports = router;
