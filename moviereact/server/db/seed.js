const Movie = require('./models/movie');
const Review = require('./models/review');
const connection = require('./connect');

// truncate tables and fill with scratch data
function seedDB() {
  if (connection) {
    const seedData = [
      {
        director: 'Stanley Kubrick',
        movie: 'The Shining',
        year: 1980,
        username: 'kubrickhead123',
        stars: 5,
        comment: 'Well, I thought it was honestly a really good movie',
      },
      {
        director: 'Paul King',
        movie: 'Paddintgon 2',
        year: 2018,
        username: 'paddingfan',
        stars: 5,
        comment: 'I thought it was honestly a really good movie!',
      },
      {
        director: 'William Friedkin',
        movie: 'The Exorcist',
        year: 1973,
        username: 'scarylady',
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
    connection.sync({ force: true }).then(() => {
      seedData.forEach((obj) => {
        Review.create({
          stars: obj.stars,
          comment: obj.comment,
          user: { username: obj.username },
          movie: { title: obj.movie, year: obj.year, director: { name: obj.director } },
        }, {
          include: [
            { association: Review.User },
            { association: Review.Movie, include: [Movie.Director] }],
        });
      });
    }).catch(console.log);
  }
}

module.exports = {
  seedDB,
};
