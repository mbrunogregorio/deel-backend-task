const express = require('express');
const { Op } = require('sequelize');
const { deposit } = require('../modules/profiles/profilesController');

const profileRoutes = express.Router();

profileRoutes.post('/deposit/:userId', deposit);
module.exports = profileRoutes;
