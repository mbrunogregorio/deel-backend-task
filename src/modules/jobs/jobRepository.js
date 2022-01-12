const {Op} = require("sequelize");

const getUnpaidJobs =  async(Job, Contract, profile_id) =>
{
    return await Job.findAll({
        where:  {
            Paid: {
                [Op.is]: null
            }
        },
        include: {
            model: Contract,
            as: 'Contract',
            where: {
                Status: {
                    [Op.eq]: 'in_progress'
                },
                [Op.or]: [{ContractorId : profile_id}, {ClientId : profile_id}]
            }
        }
    })
}

const payForJob = async(Job, job_id) => {
    //TODO Implement payment query with transactions
}


module.exports = {
    getUnpaidJobs
}