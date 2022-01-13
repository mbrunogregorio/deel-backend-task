const express = require('express');
const { getBestProfession, listBestClients } = require('../modules/admin/adminController');

const adminRoutes = express.Router();

adminRoutes.get('/best-profession', getBestProfession);
adminRoutes.get('/best-clients', listBestClients);

module.exports = adminRoutes;
