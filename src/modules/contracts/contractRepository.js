const {Op} = require("sequelize");
const {Contract} = require("../../model");

const getContractById =  async(id, ContractorId) =>
{
    return await Contract.findOne({where: {id, ContractorId}})
}

const listNonTerminatedContracts =  async(profileId) =>
{
    return await Contract.findAll({
        where: {
            Status: {
                [Op.ne]: 'terminated'
            },
            [Op.or]: [{ContractorId: profileId}, {ClientId: profileId}]
        }
    })
}

module.exports = {
    getContractById,
    listNonTerminatedContracts
}