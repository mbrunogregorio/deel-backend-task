const {Op} = require("sequelize");
const getUnpaidJobsUseCase = require("../jobs/useCases/getUnpaidJobs/getUnpaidJobsUseCase");
const payForJobsUseCase = require("../jobs/useCases/payForJob/payForJobUseCase");

/**
 * Returns a list of unpaid jobs for a user
 * @returns Job[]
 */
const getUnpaidJob = async (req, res) =>{
    const {Job, Contract} = req.app.get('models')
    const profile_id = req.profile.get('id')
    const jobs = await getUnpaidJobsUseCase(Job, Contract, profile_id);
    if(!jobs) return res.status(404).end()
    res.json(jobs)
}

/**
 * Returns a list of unpaid jobs for a user
 * @returns Job[]
 */
const payForJob = async (req, res) =>{
    const {Job, Contract} = req.app.get('models')
    const profile_id = req.profile.get('id')
    const job_id = req.params.job_id;

    const jobs = await payForJobsUseCase(Job, Contract, job_id, profile_id);
    if(!jobs) return res.status(404).end()
    res.json(jobs)
}

module.exports = {
    getUnpaidJob,
    payForJob
}