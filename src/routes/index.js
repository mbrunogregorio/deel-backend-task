const express = require('express');
const contractRoutes = require('./contract.routes');
const jobRoutes = require('./job.routes');
const profileRoutes = require('./profile.routes');
const adminRoutes = require('./admin.routes');

const routes = express.Router();

routes.use('/contracts', contractRoutes);
routes.use('/jobs', jobRoutes);

// FIXME Would be better this path starting with /profiles/balance/ since balance is a profile information
routes.use('/balance', profileRoutes);
routes.use('/admin', adminRoutes);

module.exports = routes;
