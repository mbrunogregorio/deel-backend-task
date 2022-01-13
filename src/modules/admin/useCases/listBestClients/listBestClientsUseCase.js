const { getPaidJobsSumPerClient } = require('../../../jobs/jobRepository');

const listBestClientsUseCase = async (start, end, limit) => getPaidJobsSumPerClient(start, end, limit);

module.exports = listBestClientsUseCase;
