const { listNonTerminatedContracts } = require('../../contractRepository');

const listContractsUseCase = async (profileId) => listNonTerminatedContracts(profileId);

module.exports = listContractsUseCase;
