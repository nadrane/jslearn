const config = {
  fetchRoot: 'http://localhost:8080',
  allMovies: {
    type: 'allMovies',
    fetchPath: 'movies',
    rowFormat: data => data.movies,
  },
  userReviews: {
    type: 'userReviews',
    fetchPath: 'user',
    rowFormat: data => data.user.reviews,
  },
  director: {
    type: 'director',
    fetchPath: 'director',
    rowFormat: data => data.director.movies,
  },
  movieReviews: {
    type: 'movieReviews',
    fetchPath: 'movies/film',
    rowFormat: data => data.movie.reviews,
  },
};

module.exports = config;
