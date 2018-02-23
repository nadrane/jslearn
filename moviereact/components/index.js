const config = {
  allMovies: {
    type: 'allMovies',
    fetchPath: '/movies',
    fetchFormat: resp => resp.data.movies,
  },
  userReviews: {
    type: 'userReviews',
    fetchPath: `/user/${match.params.id}`,
    fetchFormat: resp => resp.data.user.reviews,
  },
  director: {
    type: 'director',
    fetchPath: `/director/${match.params.id}`,
    fetchFormat: resp => resp.data.director.movies,
  },
  movieReviews: {
    type: 'movieReviews',
    fetchPath: `/movies/film/${match.params.id}`,
    fetchFormat: resp => resp.data.movie.reviews,
  },
};

module.exports = config;
