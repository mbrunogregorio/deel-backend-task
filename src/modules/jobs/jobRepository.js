const sequelize = require("sequelize");
const {Op} = require("sequelize");
const {Contract, Job, Profile} = require("../../model");
const {AppError} = require("../../shared/AppError");

const getUnpaidJobs =  async(profileId) =>
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
                [Op.or]: [{ContractorId : profileId}, {ClientId : profileId}]
            }
        }
    })
}

const getJob = async(jobId) => {
    return await Job.findOne({
        where: {id: jobId},
        include: {
            model: Contract,
        }
    })
}

const setJobPaid = async(jobId, t) => {
    console.log("Setting job paid")
    return await Job.update(
        { paid: 1, paymentDate: new Date()},
        {
            where: {
                id:jobId,
                paid: {[Op.is]: null}
            }
        },
        { transaction: t }
    )
}

const getTotalJobsToPay = async(profileId) => {
    return await Job.findAll({
        attributes: ['price', [sequelize.fn('sum', sequelize.col('price')), 'total']],
        where:  {
            Paid: {
                [Op.is]: true
            }
        },
        include: {
            model: Contract,
            as: 'Contract',
            where: {
                Status: {
                    [Op.eq]: 'terminated'
                },
                ClientId : profileId
            }
        }
    }).total ?? 0
}

const getJobsSumPerProfession = async(start, end) => {
    const jobsSumPerProfession = await Job.findAll({
        attributes: ['Contract.Contractor.profession', [sequelize.fn('sum', sequelize.col('price')), 'total']],
        group : ['Contract.Contractor.profession'],
        order: sequelize.literal('total DESC'),
        raw: true,
        where: {
            paid: true,
            paymentDate: {
                [Op.between]: [start, end]
            }
        },
        include: {
            model: Contract,
            as: 'Contract',
            include: {
                model: Profile,
                as: 'Contractor'
            },
        }
    })
    if(jobsSumPerProfession.length > 0){
        const { profession, total } = jobsSumPerProfession[0];
        return { profession, total };
    }
    throw new AppError('Unable to get best profession')
}

const getPaidJobsSumPerClient = async(start, end, limit) => {
    const jobsSumPerClient = await Job.findAll({
        attributes: ['Contract.Client.id', 'Contract.Client.firstName', 'Contract.Client.lastName', [sequelize.fn('sum', sequelize.col('price')), 'paid']],
        group : ['Contract.Client.id'],
        order: sequelize.literal('paid DESC'),
        raw: true,
        limit: limit,
        where: {
            paid: true,
            paymentDate: {
                [Op.between]: [start, end]
            }
        },
        include: {
            model: Contract,
            as: 'Contract',
            include: {
                model: Profile,
                as: 'Client'
            },
        }
    })

    return jobsSumPerClient.map((listItem) => {
        const {id, firstName, lastName, paid} = listItem;
        return {id, fullName: firstName+' '+lastName, paid}
    })
}

module.exports = {
    getUnpaidJobs,
    getJob,
    setJobPaid,
    getTotalJobsToPay,
    getJobsSumPerProfession,
    getPaidJobsSumPerClient,
}