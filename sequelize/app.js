// modules
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const session = require('express-session');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const { devData } = require('./db/index');

// build dev DB
devData();

// routes
const auth = require('./routes/auth');
const director = require('./routes/director');
const movies = require('./routes/movies');

const app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
nunjucks.configure('views', {
  express: app,
});
app.set('view engine', 'html');

// middleware
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => { res.redirect('/movies'); });
app.use('/auth', auth);
app.use('/movies', movies);
app.use('/director', director);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  throw err;
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { err });
});

app.listen(3000);

// DEBUG=twitterc:* npm start
// postgres -D /usr/local/var/postgres
