const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json());

const message = require('./pages/message');

app.use(express.static(__dirname + '/public'));

app.post('/message', message);

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});