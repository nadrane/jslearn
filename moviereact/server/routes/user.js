const express = require('express');
const { Movie, User, Review } = require('../db/index');

const router = express.Router();

/*
* GET /api/user/: - send reviews for one user
*/
router.get('/:id', (req, res, next) => {
  User.findById(req.params.id, {
    include: [{ model: Review, include: [Movie] }],
    order: [[Review, 'createdAt', 'DESC']],
  })
    .then((user) => {
      if (!user) {
        const uErr = new Error("Sorry! That user doesn't exist.");
        uErr.status = 404;
        throw uErr;
      }
      res.send({
        user,
        count: user.reviews.length,
      });
    })
    .catch(next);
});

module.exports = router;
