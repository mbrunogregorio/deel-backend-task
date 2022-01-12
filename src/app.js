const express = require('express');
require('express-async-errors');
const bodyParser = require('body-parser');
const { Op } = require("sequelize");
const {sequelize} = require('./model')
const routes = require('./routes')
const {getProfile} = require("./middleware/getProfile");
const {errorHandler} = require("./middleware/errorHandler");
const app = express();
app.use(bodyParser.json());
app.set('sequelize', sequelize)
app.set('models', sequelize.models)
app.use(getProfile)
app.use(routes);
app.use(errorHandler)

module.exports = app;
