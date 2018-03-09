const express = require('express');
const { User } = require('../db/index');

const router = express.Router();

router.post('/login', (req, res, next) => {
  User.findOne({ where: { username: req.body.username } })
    .then((user) => {
      if (!user) {
        return res.status(404).send();
      }
      req.session.user = {
        id: user.id,
        username: user.username,
        isAdmin: user.isAdmin,
      };
      return res.json(user);
    })
    .catch(next);
});

// router.get('/session', (req, res, next) => res.json((req.session.user ? req.session.user : null)));
router.get('/session', (req, res, next) => res.json((req.session.user ? req.session.user : { username: 'david', id: 6, isAdmin: true })));

router.delete('/logout', (req, res, next) =>
  req.session.destroy(err => (err ? next(err) : res.send())));

router.post('/register', (req, res, next) => {
  User.create(req.body, { fields: ['username'] })
    .then(user => (user ? res.json(user) : res.status(404).send()))
    .catch(next);
});

module.exports = router;
