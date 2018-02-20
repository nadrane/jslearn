const express = require('express');
const { Movie, User, Review } = require('../db/index');

const router = express.Router();

/*
* GET /user - user profile view
*/
router.get('/:id', (req, res, next) => {
  User.findById(req.params.id, {
    include: [{ model: Review, include: [Movie] }],
    order: [[Review, 'createdAt', 'DESC']],
  }).then((user) => {
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
  }).catch(next);
});

module.exports = router;
