const Sequelize = require('sequelize');
const connection = require('../connect');

const Movie = connection.define('movie', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  year: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Movie;
