const { roundedToFixed } = require('../helpers');
const express = require('express');
const connection = require('../db/connect.js');
const {
  Director,
  Movie,
  User,
  Review,
} = require('../db/index');

const router = express.Router();

router.get('/', (req, res, next) => {
  Promise.all([
    Movie.findAll({ include: [{ model: Director }], order: [['year', 'ASC']] }),
    Director.findAll({ order: [['id', 'ASC']] }),
  ])
    .then(([movies, directors]) => {
      res.render('movies', {
        movies,
        directors,
        session: req.session.sessionInfo,
      });
    })
    .catch(next);
});

/*
* POST /movies - add film
*/
router.post('/', (req, res, next) => {
  Movie.create({
    title: req.body.title,
    year: req.body.year,
    directorId: req.body.did,
  })
    .then(() => res.redirect('/'))
    .catch(next);
});

/*
* GET /movies/film - profile view - clean this up
*/
router.get('/film', (req, res, next) => {
  // retrieve movie info if exists
  const movieProm = Movie.findOne({
    where: { id: req.query.id },
    include: [
      { model: Director },
      { model: Review, include: [{ model: User }] },
    ],
    order: [[Review, 'createdAt', 'DESC']],
  })
    .then((dbRes) => {
      if (!dbRes) {
        const uErr = new Error("Sorry! That film doesn't exist.");
        uErr.status = 404;
        throw uErr;
      }
      return dbRes;
    });

  // retrieve avg score for this movie
  const avgProm = Review.findOne({
    where: { movieId: req.query.id },
    attributes: [[connection.fn('AVG', connection.col('review.stars')), 'avgValue']],
  }).then(dbRes => dbRes.dataValues.avgValue);

  // resolve once all info available
  Promise.all([movieProm, avgProm])
    .then(([movie, avg]) => {
      res.render('film', {
        movie,
        reviews: movie.reviews,
        avg: roundedToFixed(avg, 1),
        session: req.session.sessionInfo,
      });
    })
    .catch(err => next(err));
});

/*
* POST /movies/film - add review
*/
router.post('/film', (req, res, next) => {
  Review.create({
    stars: req.body.stars,
    comment: req.body.comment,
    movieId: req.body.mid,
    userId: req.session.sessionInfo.uid,
  }).then(() => res.redirect(`/movies/film?id=${req.body.mid}`))
    .catch(next);
});

// scratch
router.get('/d', (req, res, next) => {
  Promise.all([
    Review.sum('stars', { where: { movieId: 6 } }),
    Review.count({ where: { movieId: 6 } }),
  ])
    .then(([gross, count]) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ gross, count }, null, 3));
    }).catch(next);
});

module.exports = router;
