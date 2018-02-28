const Director = require('./models/director');
const Movie = require('./models/movie');
const User = require('./models/user');
const Review = require('./models/review');
const { seedDB } = require('./seed');

// define model associations
Movie.Director = Movie.belongsTo(Director);
Director.hasMany(Movie);
Review.User = Review.belongsTo(User);
User.hasMany(Review);
Review.Movie = Review.belongsTo(Movie);
Movie.hasMany(Review);

// seed dev database
// seedDB();

module.exports = {
  Director,
  Movie,
  User,
  Review,
};
