const { Op } = require('sequelize');
const { Contract } = require('../../model');

const getContractById = async (id, ContractorId) => await Contract.findOne({ where: { id, ContractorId } });

const listNonTerminatedContracts = async (profileId) => await Contract.findAll({
  where: {
    Status: {
      [Op.ne]: 'terminated',
    },
    [Op.or]: [{ ContractorId: profileId }, { ClientId: profileId }],
  },
});

module.exports = {
  getContractById,
  listNonTerminatedContracts,
};
