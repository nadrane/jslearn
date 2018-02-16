const Sequelize = require('sequelize');
const connection = require('../connect');

const Director = connection.define('directors', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Director;
