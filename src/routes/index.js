const express = require('express');
const contractRoutes = require('./contract.routes');
const jobRoutes = require('./job.routes');

const routes = express.Router();

routes.use('/contracts', contractRoutes);
routes.use('/jobs', jobRoutes);

module.exports = routes
