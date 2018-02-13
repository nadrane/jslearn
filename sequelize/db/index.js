const { addData } = require('../helpers.js');
const Sequelize = require('sequelize');

// establish connection
const connection = new Sequelize({
  database: 'movietown',
  username: null,
  password: null,
  dialect: 'postgres',
  operatorsAliases: false,
});

// define models
const Director = connection.define('directors', {
  did: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const Reviewer = connection.define('reviewers', {
  uid: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
});

const Movie = connection.define('movies', {
  mid: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  year: {
    type: Sequelize.INTEGER,
  },
});
Movie.belongsTo(Director);
Director.hasMany(Movie);

const Review = connection.define('reviews', {
  rid: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  stars: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  comment: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
Review.belongsTo(Reviewer);
Review.belongsTo(Movie);
Reviewer.hasMany(Review);
Movie.hasMany(Review);

const dbConfig = {
  Sequelize,
  connection,
  models: {
    Director,
    Movie,
    Reviewer,
    Review,
  },
  // truncate tables and fill with scratch data
  devData: () => {
    if (connection) {
      Director.sync({ force: true })
        .then(() => Reviewer.sync({ force: true }))
        .then(() => Movie.sync({ force: true }))
        .then(() => Review.sync({ force: true }))
        .then(() =>
          addData(
            {
              Director,
              Movie,
              Reviewer,
              Review,
            },
            [
              {
                director: 'Stanley Kubrick',
                title: 'The Shining',
                year: 1980,
                username: 'kubrickhead123',
                stars: 4,
                comment: 'I thought it was honestly a really good movie',
              },
              {
                director: 'Paul King',
                title: 'Paddintgon 2',
                year: 2018,
                username: 'paddingfan',
                stars: 5,
                comment: 'I thought it was honestly a really good movie',
              },
              {
                director: 'Brian De Palma',
                title: 'The Exorcist',
                year: 1973,
                username: 'scarylady',
                stars: 3,
                comment: 'I thought it was honestly a really good movie',
              },
              {
                director: 'Orson Welles',
                title: 'Citizen Kane',
                year: 1941,
                username: 'mrclassic',
                stars: 4,
                comment: 'I thought it was honestly a really good movie',
              },
              {
                director: 'Paul Thomas Anderson',
                title: 'Magnolia',
                year: 1999,
                username: 'PTA4lyfe',
                stars: 4,
                comment: 'I thought it was honestly a really good movie',
              },
            ],
          ))
        .catch(err => console.log(err));
    }
  },
};

module.exports = dbConfig;
