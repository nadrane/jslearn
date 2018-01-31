// modules
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const { Client } = require('pg');

const app = express();

// middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', (req, res) => {
  const client = new Client();
  client.connect();
  client.query('INSERT INTO numbers VALUES (666);', (err, res) => {
    client.end();
  });
  res.send('howdy partners');
});

app.listen(3000);
