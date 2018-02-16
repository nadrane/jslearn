// import connection and models
const connection = require('./connect');
const Director = require('./models/director');
const Movie = require('./models/movie');
const User = require('./models/user');
const Review = require('./models/review');

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
        director: 'Stanley Kubrick',
        movie: 'The Shining',
        year: 1980,
        username: 'kubrickhead1234',
        stars: 5,
        comment: 'Well, I thought it was honestly a really good movie',
      },
      {
        director: 'Paul King',
        movie: 'Paddintgon 2',
        year: 2018,
        username: 'paddingfan4',
        stars: 5,
        comment: 'I thought it was honestly a really good movie!',
      },
      {
        director: 'William Friedkin',
        movie: 'The Exorcist',
        year: 1973,
        username: 'scarylady9',
        stars: 5,
        comment: 'I thought it was honestly a really good movie to be honest',
      },
      {
        director: 'Orson Welles',
        movie: 'Citizen Kane',
        year: 1941,
        username: 'mrclassic',
        stars: 5,
        comment: 'I truly thought it was honestly a really good movie',
      },
      {
        director: 'Paul Thomas Anderson',
        movie: 'Magnolia',
        year: 1999,
        username: 'PTA4lyfe',
        stars: 5,
        comment: 'I thought it was honestly a really good movie!',
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
      .catch(console.log);
  }
}

module.exports = {
  Director,
  Movie,
  User,
  Review,
  seedDB,
};
