const { getContractById } = require('../../contractRepository');

const getContractUseCase = async (profileId, ContractorId) => getContractById(profileId, ContractorId);

module.exports = getContractUseCase;
