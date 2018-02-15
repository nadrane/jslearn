const { timestamp } = require('../helpers');
const express = require('express');
const { models } = require('../db/index');

const router = express.Router();

/*
* GET /reviewer - user profile view
*/
router.get('/', (req, res, next) => {
  models.Reviewer.findOne({
    where: { uid: req.query.id },
    include: [{ model: models.Review, include: [{ model: models.Movie }] }],
    order: [[models.Review, 'createdAt', 'DESC']],
  })
    .then((reviewer) => {
      if (!reviewer) {
        const uErr = new Error("Sorry! That user doesn't exist.");
        uErr.status = 404;
        throw uErr;
      }
      reviewer.reviews.map(timestamp);
      res.render('reviewer', {
        reviewer,
        count: reviewer.reviews.length,
        session: req.session.sessionInfo,
      });
    })
    .catch(err => next(err));
});

module.exports = router;
