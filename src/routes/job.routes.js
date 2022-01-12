const express = require('express');
const {Op} = require("sequelize");
const {getUnpaidJob, payForJob} = require("../modules/jobs/jobsController");
const jobRoutes = express.Router();

jobRoutes.get('/unpaid', getUnpaidJob)
jobRoutes.get('/:job_id/pay', payForJob)
module.exports = jobRoutes;