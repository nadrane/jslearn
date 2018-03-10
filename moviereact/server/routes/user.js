const express = require('express');
const { Movie, User, Review } = require('../db/index');

const router = express.Router();

// TODO: update model with scope
router.get('/:id', (req, res, next) => {
  User.findById(req.params.id, {
    include: [{ model: Review, include: [Movie] }],
    order: [[Review, 'createdAt', 'DESC']],
  })
    .then(user => (user ? res.json({ user }) : res.status(404).send()))
    .catch(next);
});

module.exports = router;
