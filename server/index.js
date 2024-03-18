const express = require('express');
const bodyParser = require('body-parser');
const basicAuth = require('express-basic-auth');

const { BASIC_AUTH_USER, BASIC_AUTH_PASSWORD } = require('../config.json');
const message = require('./pages/message');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json());

app.use('/', basicAuth({
  challenge: true,
  users: { [BASIC_AUTH_USER]: BASIC_AUTH_PASSWORD }
}))
app.post('/message', message);
app.use('/', express.static(__dirname + '/public'));

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});