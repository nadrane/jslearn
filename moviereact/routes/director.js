const express = require('express');
const { Director, Movie } = require('../db/index');

const router = express.Router();

/*
* GET /director - director profile view
*/
router.get('/:id', (req, res, next) => {
  if (req.params.id) {
    Director.findById(req.params.id, { include: [Movie], order: [[Movie, 'year', 'ASC']] })
      .then((director) => {
        if (!director) {
          const uErr = new Error("Sorry! That director doesn't exist.");
          uErr.status = 404;
          throw uErr;
        }
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.send(JSON.stringify({
          director,
          count: director.movies.length,
        }, null, 3));
      }).catch(next);
  } else {
    console.log('entered else');
    Director.findAll({ order: [['id', 'ASC']] })
      .then((directors) => {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.send(JSON.stringify({
          directors,
        }, null, 3));
      }).catch(next);
  }
});

router.get('/', (req, res, next) => {
  console.log('entered else');
  Director.findAll({ order: [['id', 'ASC']] })
    .then((directors) => {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.send(JSON.stringify({
        directors,
      }, null, 3));
    }).catch(next);
});

/*
* POST /director - add new director
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
