const {getUnpaidJobs} = require("../../jobRepository");

const getUnpaidJobsUseCase = async(profile_id) => {
    return getUnpaidJobs(profile_id)
}

module.exports = getUnpaidJobsUseCase