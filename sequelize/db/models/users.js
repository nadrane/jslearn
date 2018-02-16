const Sequelize = require('sequelize');
const connection = require('../connect');

const User = connection.define('users', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
});

module.exports = User;
