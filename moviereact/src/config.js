const config = {
  fetchRoot: 'http://localhost:8080',
  allMovies: {
    type: 'allMovies',
    fetchPath: 'movies',
    fetchFormat: resp => resp.data.movies,
  },
  userReviews: {
    type: 'userReviews',
    fetchPath: 'user',
    fetchFormat: resp => resp.data.user.reviews,
  },
  director: {
    type: 'director',
    fetchPath: 'director',
    fetchFormat: resp => resp.data.director.movies,
  },
  movieReviews: {
    type: 'movieReviews',
    fetchPath: 'movies/film',
    fetchFormat: resp => resp.data.movie.reviews,
  },
};

module.exports = config;
