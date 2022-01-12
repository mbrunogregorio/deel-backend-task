const {Op} = require("sequelize");

const getContractById =  async(Contract, id, ContractorId) =>
{
    return await Contract.findOne({where: {id, ContractorId}})
}

const listNonTerminatedContracts =  async(Contract, profile_id) =>
{
    return await Contract.findAll({
        where: {
            Status: {
                [Op.ne]: 'terminated'
            },
            [Op.or]: [{ContractorId: profile_id}, {ClientId: profile_id}]
        }
    })
}

module.exports = {
    getContractById,
    listNonTerminatedContracts
}