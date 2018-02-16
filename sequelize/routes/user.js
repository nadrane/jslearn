const express = require('express');
const { Movie, User, Review } = require('../db/index');

const router = express.Router();

/*
* GET /user - user profile view
*/
router.get('/', (req, res, next) => {
  User.findOne({
    where: { id: req.query.id },
    include: [{ model: Review, include: [{ model: Movie }] }],
    order: [[Review, 'createdAt', 'DESC']],
  })
    .then((user) => {
      if (!user) {
        const uErr = new Error("Sorry! That user doesn't exist.");
        uErr.status = 404;
        throw uErr;
      }
      res.render('user', {
        user,
        count: user.reviews.length,
        session: req.session.sessionInfo,
      });
    })
    .catch(next);
});

module.exports = router;
