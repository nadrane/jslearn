const express = require('express');

const app = express();

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/david', (req, res) => res.send('Hello David!'));


app.listen(3000, () => console.log('Example app listening on port 3000!'));
