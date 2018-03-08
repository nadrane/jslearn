const express = require('express');
const { User } = require('../db/index');

const router = express.Router();

/*
* POST to api/auth/login - set user session
*/
router.post('/login', (req, res, next) => {
  User.findOne({ where: { username: req.body.username } })
    .then((user) => {
      if (!user) {
        return res.status(404).send();
      }
      req.session.user = {
        id: user.id,
        username: user.username,
      };
      return res.json(user);
    })
    .catch(next);
});

/*
* GET api/auth/session - check for current server session
*/
router.get('/session', (req, res, next) => res.json((req.session.user ? req.session.user : { username: 'david', id: 6, isAdmin: true })));

/*
* DELETE api/auth/logout - destroy server session
*/
router.delete('/logout', (req, res, next) =>
  req.session.destroy(err => (err ? next(err) : res.status(200).send())));

/*
* POST to api/auth/register - set new user session
*/
router.post('/register', (req, res, next) => {
  User.create(req.body, { fields: ['username'] })
    .then(user => (user ? res.json(user) : res.status(404).send()))
    .catch(next);
});

module.exports = router;
