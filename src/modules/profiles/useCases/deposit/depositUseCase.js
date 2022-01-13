const { updateBalance } = require('../../profileRepository');
const { getTotalJobsToPay } = require('../../../jobs/jobRepository');
const { AppError } = require('../../../../shared/AppError');

const depositUseCase = async (userId, amount) => {
  console.log('Starting depositUseCase');
  const totalJobsToPay = await getTotalJobsToPay(userId);

  // check if amount <= 25% of client's total jobs to pay
  // I could not understand this business rule
  if (amount > totalJobsToPay / 4) { throw new AppError('Unable to deposit - amout greater than limit allowed', 400); }

  await updateBalance(userId, amount, 'add');
};

module.exports = depositUseCase;
