const express = require('express');
const helpers = require('../helpers.js');
const { Client } = require('pg');

const router = express.Router();

/* GET tweets root (all-tweets view) */
router.get('/', (req, res) => {
  const queryText = `SELECT *
                      FROM tweets 
                      JOIN users ON tweets.uid = users.uid 
                      ORDER BY datetime desc`;
  const client = new Client();
  client.connect();
  client.query(queryText, (err, dbRes) => {
    if (err) throw err;
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
  // why does .catch below send to app.js err handler?
  //  .catch(e => e);
});

/* POST to root - submit tweet */
router.post('/', (req, res) => {
  const queryText = 'INSERT INTO tweets(datetime, text, uid) VALUES($1, $2, $3)';
  const queryVals = [Date.now(), req.body.tweetbox, req.session.sessionUser.uid];
  const client = new Client();
  client.connect();
  client.query(queryText, queryVals, (err) => {
    if (err) throw err;
    client.end();
    res.redirect('/');
  });
});

/* GET user view */
router.get('/user', (req, res, next) => {
  // check if user exists
  const queryText = 'SELECT DISTINCT * FROM users WHERE uid = $1';
  const queryVals = [req.query.id];
  const client = new Client();
  client.connect();
  client.query(queryText, queryVals, (err, userRes) => {
    if (err) throw err;
    client.end();
    // return next(uErr) vs next(uErr) vs. throw here - way to use throw?
    if (userRes.rows.length === 0) {
      const uErr = new Error("Sorry! That user doesn't exist.");
      uErr.status = 404;
      next(uErr);
    } else {
      // user exists, check for tweets
      const [user] = userRes.rows;
      let tweets;
      const tweetQuery = `SELECT *
                          FROM tweets
                          JOIN users ON tweets.uid = users.uid
                          WHERE users.uid = $1 ORDER BY datetime desc`;
      const tweetQueryVals = [req.query.id];
      const subClient = new Client();
      subClient.connect();
      subClient.query(tweetQuery, tweetQueryVals, (subErr, tweetRes) => {
        if (subErr) throw subErr;
        if (tweetRes.rows.length > 0) {
          tweets = helpers.timeAgo(tweetRes.rows);
        }
        res.render('tweetlayout', {
          tweets,
          user,
          session: req.session.sessionUser,
          currentTime: Date.now(),
        });
        subClient.end();
      });
    }
    // try {
    //   if (userRes.rows.length === 0) {
    //     const uErr = new Error("Sorry! That user doesn't exist.");
    //     uErr.status = 404;
    //     throw uErr;
    //   }
    // } catch (e) {
    //   next(e);
    // }
  });
});

module.exports = router;
