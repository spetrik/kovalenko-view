require('dotenv').config();
require('rootpath')();

const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('morgan');
const jwt = require('middleware/jwt');
const errorHandler = require('middleware/error-handler');

// Create/Connect to DB
mongoose.connect(process.env.DB, { useCreateIndex: true, useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(logger('dev'));

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/auth', require('./routes/route-auth'));
app.use('/users', require('./routes/route-user'));

// catch 404 error
app.use((req, res, next) => {
  res.status(404).send(`${req.url} not found!`);
});

// global error handler
app.use(errorHandler);

// start server
const port = process.env.PORT;
const server = app.listen(port, function () {
  console.log('Server listening on port ' + port);
});
