const {Op} = require("sequelize");
const {getContractById, listNonTerminatedContracts} = require('./contractRepository');
const getContractUseCase = require("./useCases/getContract/getContractUseCase");
const listContractsUseCase = require("./useCases/listContracts/listContractsUseCase");

/**
 * Returns a list of contracts belonging to a user
 * @returns Contract[]
 */
const listContracts = async (req, res) =>{
    const profile_id = req.profile.get('id')
    const {Contract} = req.app.get('models')
    const contract = await listContractsUseCase(Contract, profile_id);
    if(!contract) return res.status(404).end()
    res.json(contract)
}

/**
 * Get contract data for the given id and profile
 * @returns Contract
 */
const getContract = async (req, res) =>{
    const {Contract} = req.app.get('models')
    const {id} = req.params
    const ContractorId = req.profile.get('id')
    const contract = await getContractUseCase(Contract, id, ContractorId)
    if(!contract) return res.status(404).end()
    res.json(contract)
}

module.exports = {
    listContracts,
    getContract
};