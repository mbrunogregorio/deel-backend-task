const getUnpaidJobsUseCase = require("../jobs/useCases/getUnpaidJobs/getUnpaidJobsUseCase");
const payForJobsUseCase = require("../jobs/useCases/payForJob/payForJobUseCase");
const {AppError} = require("../../shared/AppError");

/**
 * Returns a list of unpaid jobs for a user
 * @returns Job[]
 */
const getUnpaidJob = async (req, res) =>{
    const profileId = req.profile.id
    const jobs = await getUnpaidJobsUseCase(profileId);
    if(!jobs) throw new AppError('Unpaid jobs not found', 404)
    res.json(jobs)
}

/**
 * Pay for a job with the given id
 * @returns
 */
const payForJob = async (req, res) =>{
    const profileId = req.profile.id
    const jobId = req.params.job_id;
    await payForJobsUseCase(jobId, profileId);
    res.json()
}

module.exports = {
    getUnpaidJob,
    payForJob
}