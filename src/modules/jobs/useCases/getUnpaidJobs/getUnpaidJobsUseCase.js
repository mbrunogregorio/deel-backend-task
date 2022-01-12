const {getUnpaidJobs} = require("../../jobRepository");

const getUnpaidJobsUseCase = async(Job, Contract, profile_id) => {
    return getUnpaidJobs(Job, Contract, profile_id)
}

module.exports = getUnpaidJobsUseCase