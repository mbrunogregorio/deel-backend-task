const getContractUseCase = require("./useCases/getContract/getContractUseCase");
const listContractsUseCase = require("./useCases/listContracts/listContractsUseCase");
const {AppError} = require("../../shared/AppError");

/**
 * Returns a list of contracts belonging to a user
 * @returns Contract[]
 */
const listContracts = async (req, res) =>{
    const profileId = req.profile.id
    const contract = await listContractsUseCase(profileId);
    if(!contract) throw new AppError('No contracts found', 404)
    res.json(contract)
}

/**
 * Get contract data for the given id and profile
 * @returns Contract
 */
const getContract = async (req, res) =>{
    const {id} = req.params
    const ContractorId = req.profile.id
    const contract = await getContractUseCase(id, ContractorId)
    if(!contract) throw new AppError('No contracts found', 404)
    res.json(contract)
}

module.exports = {
    listContracts,
    getContract
};