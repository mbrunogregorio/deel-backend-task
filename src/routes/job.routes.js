const express = require('express');
const { getUnpaidJob, payForJob } = require('../modules/jobs/jobsController');

const jobRoutes = express.Router();

jobRoutes.get('/unpaid', getUnpaidJob);
jobRoutes.post('/:job_id/pay', payForJob);
module.exports = jobRoutes;
