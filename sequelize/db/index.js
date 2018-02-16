// import connection and models
const connection = require('./connect');
const Director = require('./models/directors');
const Movie = require('./models/movies');
const User = require('./models/users');
const Review = require('./models/reviews');

// define model associations
Movie.belongsTo(Director);
Director.hasMany(Movie);
Review.belongsTo(User);
User.hasMany(Review);
Review.belongsTo(Movie);
Movie.hasMany(Review);

// truncate tables and fill with scratch data
function seedDB() {
  if (connection) {
    const seedData = [
      {
        director: 'Stanley Kubrickzzzzzzz',
        movie: 'The Shiningzzzzzzz',
        year: 1980,
        username: 'kubrickhead123zzzzzzz',
        stars: 4,
        comment: 'I thought it was honestly a really good moviezzzzzzz',
      },
      {
        director: 'Paul Kingzzzzzzz',
        movie: 'Paddintgon 2zzzzzzz',
        year: 2018,
        username: 'paddingfanzzzzzzz',
        stars: 5,
        comment: 'I thought it was honestly a really good moviezzzzzzz',
      },
      {
        director: 'William Friedkinzzzzzzz',
        movie: 'The Exorcistzzzzzzz',
        year: 1973,
        username: 'scaryladyzzzzzzz',
        stars: 3,
        comment: 'I thought it was honestly a really good moviezzzzzzz',
      },
      {
        director: 'Orson Welleszzzzzzz',
        movie: 'Citizen Kanezzzzzzz',
        year: 1941,
        username: 'mrclassiczzzzzzz',
        stars: 4,
        comment: 'I thought it was honestly a really good moviezzzzzzz',
      },
      {
        director: 'Paul Thomas Andersonzzzzzzz',
        movie: 'Magnoliazzzzzzz',
        year: 1999,
        username: 'PTA4lyfezzzzzzz',
        stars: 4,
        comment: 'I thought it was honestly a really good moviezzzzzzz',
      },
    ];
    Director.sync({ force: true })
      .then(() => User.sync({ force: true }))
      .then(() => Movie.sync({ force: true }))
      .then(() => Review.sync({ force: true }))
      .then(() => {
        seedData.forEach((obj) => {
          Director.create({ name: obj.director })
            .then(director =>
              Promise.all([
                director.createMovie({ title: obj.movie, year: obj.year }),
                User.create({ username: obj.username }),
              ]))
            .then(([movie, user]) => {
              Review.create({
                stars: obj.stars,
                comment: obj.comment,
                movieId: movie.id,
                userId: user.id,
              });
            });
        });
      })
      .catch(err => console.log(err));
  }
}
seedDB();

module.exports = {
  Director,
  Movie,
  User,
  Review,
};
