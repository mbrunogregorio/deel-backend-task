const depositUseCase = require('./useCases/deposit/depositUseCase');

/**
 * Deposit an amount to the given User balance
 * @returns Job[]
 */
const deposit = async (req, res) => {
  const { userId } = req.params;
  const { amount } = req.body;
  await depositUseCase(userId, amount);
  res.json();
};

module.exports = {
  deposit,
};
