const {getContractById} = require("../../contractRepository");

const getContractUseCase =  async(profileId, ContractorId) =>
{
    return getContractById(profileId, ContractorId)
}

module.exports = getContractUseCase