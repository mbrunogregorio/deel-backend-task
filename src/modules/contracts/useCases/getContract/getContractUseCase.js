const {getContractById} = require("../../contractRepository");

const getContractUseCase =  async(Contract, profile_id, ContractorId) =>
{
    return getContractById(Contract, profile_id, ContractorId)
}

module.exports = getContractUseCase