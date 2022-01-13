const { getJob, setJobPaid } = require('../../jobRepository');
const { getProfile, updateBalance } = require('../../../profiles/profileRepository');
const { AppError } = require('../../../../shared/AppError');
const { sequelize } = require('../../../../model');

const payForJobUseCase = async (jobId, profileId) => {
  console.log('Starting payForJobUseCase');
  const job = await getJob(jobId);
  const clientProfile = await getProfile(profileId);
  const contract = await job.getContract();
  const contractorId = contract.get('ContractorId');

  const jobPrice = job.get('price');

  if (clientProfile.get('balance') < jobPrice) { throw new AppError('Unable to pay for the job - Insufficient funds', 400); }

  if (job.get('paid')) { throw new AppError('Unable to pay for the job - Already paid', 400); }

  // Used transactions to make sure that if an error happen, the application will discard the whole database operation
  const transactionHandler = await sequelize.transaction();
  try {
    await setJobPaid(jobId, transactionHandler);
    await updateBalance(contractorId, jobPrice, 'add', transactionHandler);
    await updateBalance(profileId, jobPrice, 'rem', transactionHandler);
    await transactionHandler.commit();
  } catch (error) {
    await transactionHandler.rollback();
  }
};

module.exports = payForJobUseCase;
