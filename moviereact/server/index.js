const express = require('express');
const path = require('path');
const logger = require('morgan');
const session = require('express-session');
const bodyParser = require('body-parser');

// routes
const auth = require('./routes/auth');
const director = require('./routes/director');
const movies = require('./routes/movies');
const user = require('./routes/user');

const app = express();

// middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: '*N:K5zN!]rrp{og',
  resave: false,
  saveUninitialized: false,
}));
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use('/api/auth', auth);
app.use('/api/movies', movies);
app.use('/api/director', director);
app.use('/api/user', user);

app.listen(process.env.PORT || 8080, () =>
  console.log(`Listening on ${process.env.PORT || 8080}`));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
});

// postgres -D /usr/local/var/postgres
// nodemon app.js
// npm start
