const express = require('express');
const helpers = require('../helpers.js');
const { Client, connectionString } = require('../db/index');

// router and db config
const router = express.Router();

/* GET tweets root (all-tweets view) */
router.get('/', (req, res, next) => {
  const queryText = `SELECT *
                      FROM tweets 
                      JOIN users ON tweets.uid = users.uid 
                      ORDER BY datetime desc`;
  const client = new Client({ connectionString });
  client.connect();
  client.query(queryText, (err, dbRes) => {
    if (err) return next(err);
    let tweets;
    if (dbRes.rows.length > 0) {
      tweets = helpers.timeAgo(dbRes.rows);
    }
    res.render('tweetlayout', {
      tweets,
      session: req.session.sessionUser,
      currentTime: Date.now(),
    });
    client.end();
  });
});

/* POST to root - submit tweet */
router.post('/', (req, res, next) => {
  const queryText = 'INSERT INTO tweets(datetime, text, uid) VALUES($1, $2, $3)';
  const queryVals = [Date.now(), req.body.tweetbox, req.session.sessionUser.uid];
  const client = new Client({ connectionString });
  client.connect();
  client.query(queryText, queryVals, (err) => {
    if (err) return next(err);
    client.end();
    res.redirect('/');
  });
});

/* GET user view */
router.get('/user', (req, res, next) => {
  // check if user exists
  let queryText = 'SELECT DISTINCT * FROM users WHERE uid = $1';
  let queryVals = [req.query.id];
  const client = new Client({ connectionString });
  client.connect();
  client.query(queryText, queryVals, (err, userRes) => {
    if (err) return next(err);
    if (userRes.rows.length === 0) {
      const uErr = new Error("Sorry! That user doesn't exist.");
      uErr.status = 404;
      return next(uErr);
    }
    // user exists, check for tweets
    const [user] = userRes.rows;
    let tweets;
    queryText = `SELECT *
                  FROM tweets
                  JOIN users ON tweets.uid = users.uid
                  WHERE users.uid = $1 ORDER BY datetime desc`;
    queryVals = [req.query.id];
    client.query(queryText, queryVals, (tweetErr, tweetRes) => {
      if (tweetErr) return next(tweetErr);
      if (tweetRes.rows.length > 0) {
        tweets = helpers.timeAgo(tweetRes.rows);
      }
      res.render('tweetlayout', {
        tweets,
        user,
        session: req.session.sessionUser,
        currentTime: Date.now(),
      });
      client.end();
    });
  });
});

module.exports = router;
