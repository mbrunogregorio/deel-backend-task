const { getJobsSumPerProfession } = require('../../../jobs/jobRepository');

const getBestProfessionUsecase = async (start, end) => getJobsSumPerProfession(start, end);

module.exports = getBestProfessionUsecase;
