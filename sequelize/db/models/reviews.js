const Sequelize = require('sequelize');
const connection = require('../connect');

const Review = connection.define('reviews', {
  stars: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  comment: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Review;
