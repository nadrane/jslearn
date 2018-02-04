const { Client } = require('pg');

const connectionString = 'postgresql://machajew:twitterc@localhost:5432/twitterc';
const usersData = "(1, 'First', 'Man', 'first'), (2, 'Second', 'Man', 'second'), (3, 'Third', 'Man', 'third'), (4, 'Fourth', 'Man', 'fourth')";
const tweetsData = `(1517514973589, 'This is firsts first', 1), 
                    (1517514987173, 'This is firsts second!', 1),
                    (1517515010805, 'This is seconds first', 2),
                    (1517515042677, 'This is seconds second', 2),
                    (1517515139773, 'This is thirds first', 3),
                    (1517515139773, 'This is fourth first', 4),
                    (1517528821576, 'This is thirds second!!!!OK!!!', 3);`;
const dbConfig = {
  Client,
  connectionString,
  buildDB: () => {
    const client = new Client({ connectionString });
    client.connect();
    client.query('TRUNCATE tweets, users;')
      .then(res => client.query(`INSERT INTO tweets (datetime, text, uid) VALUES ${tweetsData};`))
      .then(res => client.query(`INSERT INTO users (uid, fname, lname, handle) VALUES ${usersData};`))
      .catch(e => console.log(e))
      .then(res => client.end());
  },
};

module.exports = dbConfig;
