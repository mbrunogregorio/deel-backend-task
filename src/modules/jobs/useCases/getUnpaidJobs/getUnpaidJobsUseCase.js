const { getUnpaidJobs } = require('../../jobRepository');

const getUnpaidJobsUseCase = async (profile_id) => getUnpaidJobs(profile_id);

module.exports = getUnpaidJobsUseCase;
