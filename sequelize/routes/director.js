const express = require('express');
const { models } = require('../db/index');

const router = express.Router();

/*
* GET /director - director profile view
*/
router.get('/', (req, res, next) => {
  models.Director.findOne({
    where: { did: req.query.id },
    include: [{
      model: models.Movie,
    }],
    order: [[models.Movie, 'year', 'ASC']],
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
  }).catch(err => next(err));
});

/*
* POST /director - add new director
*/
router.post('/', (req, res, next) => {
  if (!req.body.dirname) {
    return res.redirect('/');
  }
  return models.Director.create({ name: req.body.dirname })
    .then(() => res.redirect('/'))
    .catch(err => next(err));
});

module.exports = router;
