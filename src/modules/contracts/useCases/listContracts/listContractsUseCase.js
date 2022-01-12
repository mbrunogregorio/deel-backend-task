const {listNonTerminatedContracts} = require("../../contractRepository");

const listContractsUseCase =  async(profileId) =>
{
    return listNonTerminatedContracts(profileId)
}

module.exports = listContractsUseCase