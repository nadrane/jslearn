const express = require('express');
const helpers = require('../helpers.js');
const { Client } = require('pg');

const router = express.Router();

/* GET tweets root (all-tweets view) */
router.get('/', (req, res) => {
  const queryText = 'SELECT * FROM tweets JOIN users ON tweets.uid = users.uid ORDER BY datetime desc';
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
router.get('/user', (req, res) => {
  // check if user exists
  let uErr;
  const queryText = 'SELECT DISTINCT * FROM users WHERE uid = $1';
  const queryVals = [req.query.id];
  const client = new Client();
  client.connect();
  client.query(queryText, queryVals, (err, userRes) => {
    if (err) throw err;
    client.end();
    // can we forward this to app.js err handler via next?
    if (userRes.rows.length === 0) {
      uErr = new Error("Sorry! That user doesn't exist.");
      uErr.status = 505;
      return res.render('error', { err: uErr });
    }
    // user exists, check for tweets
    const [user] = userRes.rows;
    let tweets;
    const tweetQuery = 'SELECT * FROM tweets JOIN users ON tweets.uid = users.uid WHERE users.uid = $1 ORDER BY datetime desc';
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
  });
});

module.exports = router;
