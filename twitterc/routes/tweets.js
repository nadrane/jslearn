const express = require('express');
const helpers = require('../helpers.js');
const { Client, connectionString } = require('../db/index');

// router and db config
const router = express.Router();

/* GET tweets root (all-tweets view) */
router.get('/', (req, res, next) => {
  const client = new Client({ connectionString });
  client.connect();
  client.query(`SELECT * FROM tweets 
                JOIN users ON tweets.uid = users.uid 
                ORDER BY datetime desc;`)
    .then((dbRes) => {
      let tweets;
      if (dbRes.rows.length > 0) {
        tweets = helpers.timeAgo(dbRes.rows);
      }
      res.render('tweetlayout', {
        tweets,
        session: req.session.sessionUser,
        currentTime: Date.now(),
      });
    })
    .catch(e => next(e))
    .then(() => client.end());
});

/* POST to root - submit tweet */
router.post('/', (req, res, next) => {
  const client = new Client({ connectionString });
  client.connect();
  client.query(
    `INSERT INTO tweets(datetime, text, uid) 
      VALUES($1, $2, $3)`,
    [Date.now(), req.body.tweetbox, req.session.sessionUser.uid],
  )
    .then(() => res.redirect('/'))
    .catch(e => next(e))
    .then(() => client.end());
});

/* GET user view */
router.get('/user', (req, res, next) => {
  // check if user exists
  let user;
  let tweets;
  const client = new Client({ connectionString });
  client.connect();
  client.query(
    'SELECT DISTINCT * FROM users WHERE uid = $1;',
    [req.query.id],
  )
    .then((dbRes) => {
      if (dbRes.rows.length === 0) {
        const uErr = new Error("Sorry! That user doesn't exist.");
        uErr.status = 404;
        throw uErr;
      }
      // user exists, check for tweets
      [user] = dbRes.rows;
      return client.query(
        `SELECT * FROM tweets
          JOIN users ON tweets.uid = users.uid
          WHERE users.uid = $1 ORDER BY datetime desc`,
        [req.query.id],
      );
    })
    .then((dbRes) => {
      if (dbRes.rows.length > 0) {
        tweets = helpers.timeAgo(dbRes.rows);
      }
      res.render('tweetlayout', {
        tweets,
        user,
        session: req.session.sessionUser,
        currentTime: Date.now(),
      });
    })
    .catch(e => next(e))
    .then(() => client.end());
});

module.exports = router;
