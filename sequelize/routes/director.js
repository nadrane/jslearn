const express = require('express');
const { Director, Movie } = require('../db/index');

const router = express.Router();

/*
* GET /director - director profile view
*/
router.get('/', (req, res, next) => {
  Director.findById(req.query.id, {
    include: [{ model: Movie }],
    order: [[Movie, 'year', 'ASC']],
  }).then((director) => {
    if (!director) {
      const uErr = new Error("Sorry! That director doesn't exist.");
      uErr.status = 404;
      throw uErr;
    }
    res.render('director', {
      director,
      count: director.movies.length,
      session: req.session.sessionInfo,
    });
  }).catch(next);
});

/*
* POST /director - add new director
*/
router.post('/', (req, res, next) => {
  if (!req.body.dirname) {
    return res.redirect('/');
  }
  return Director.create({ name: req.body.dirname })
    .then(() => res.redirect('/'))
    .catch(next);
});

module.exports = router;
