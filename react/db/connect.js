const Sequelize = require('sequelize');

// establish connection
const connection = new Sequelize({
  database: 'movietown',
  username: null,
  password: null,
  dialect: 'postgres',
  operatorsAliases: false,
});

module.exports = connection;
