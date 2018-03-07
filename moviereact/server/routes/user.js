const express = require('express');
const { Movie, User, Review } = require('../db/index');

const router = express.Router();

/*
* GET /api/user/: - serve reviews for one user
*/
router.get('/:id', (req, res, next) => {
  User.findById(req.params.id, {
    include: [{ model: Review, include: [Movie] }],
    order: [[Review, 'createdAt', 'DESC']],
  })
    .then(user => (user ? res.json({ user }) : res.status(404).send()))
    .catch(next);
});

module.exports = router;
