const {listNonTerminatedContracts} = require("../../contractRepository");

const listContractsUseCase =  async(Contract, profile_id) =>
{
    return listNonTerminatedContracts(Contract, profile_id)
}

module.exports = listContractsUseCase