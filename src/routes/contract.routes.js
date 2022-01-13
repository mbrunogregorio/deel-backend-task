const express = require('express');
const { listContracts, getContract } = require('../modules/contracts/contractsController');

const contractRouter = express.Router();

contractRouter.get('/', listContracts);
contractRouter.get('/:id', getContract);

module.exports = contractRouter;
