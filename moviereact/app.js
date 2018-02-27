const express = require('express');
const path = require('path');
const logger = require('morgan');
// const session = require('express-session');
const bodyParser = require('body-parser');
// const nunjucks = require('nunjucks');
// const { seedDB } = require('./db/index.js');

// build dev database
// seedDB();

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
// app.use((req, res, next) => {
//   // CORS headers
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // restrict it to the required domain
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//   // Set custom headers for CORS
//   res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Custom-Header');

//   if (req.method === 'OPTIONS') {
//     return res.status(200).end();
//   }

//   return next();
// });
app.use(express.static(path.join(__dirname, 'public')));
app.use('/auth', auth);
app.use('/movies', movies);
app.use('/director', director);
app.use('/user', user);
app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', (req, res) => res.send('pong'));

app.get('/', (req, res) => {
  console.log('hitting')
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(process.env.PORT || 8080, () => {
  console.log(`listening on ${process.env.PORT || 8080}`)
});

// postgres -D /usr/local/var/postgres
// nodemon app.js
// npm start
