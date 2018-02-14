const express = require('express');
const { models } = require('../db/index');

const router = express.Router();

router.get('/', (req, res, next) => {
  models.Director.findOne({
    where: { did: req.query.id },
    include: [{
      model: models.Movie,
    }],
  }).then(director => res.render('director', {
    director,
    count: director.movies.length,
    session: req.session.sessionInfo,
  })).catch(err => next(err));
});

module.exports = router;
