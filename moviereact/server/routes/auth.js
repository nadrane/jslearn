const express = require('express');
const { User } = require('../db/index');

const router = express.Router();

/* POST to api/auth/login - set user session --- need to set server session here */
router.post('/login', (req, res, next) => {
  User.findOne({
    where: { username: req.body.username },
  })
    .then((user) => {
      if (!user) {
        // send err code here
        return res.send({ err: 'bad!' });
      }
      return res.json(user);
    })
    .catch(next);
});

/* GET api/auth/logout */
router.get('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) console.log(err);
    return res.redirect('/');
  });
});

/* POST to api/auth/register - write new user and set session --- need to set server session here */
router.post('/register', (req, res, next) => {
  User.create(req.body, { fields: ['username'] })
    .then((user) => {
      if (!user) {
        return res.json({ err: 'bad!' });
      }
      return res.json(user);
    })
    .catch(next);
});

module.exports = router;
