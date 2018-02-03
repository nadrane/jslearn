const { Client } = require('pg');
const connection = Client.connect();

connection.query("TRUN");

module.exports = connection;
