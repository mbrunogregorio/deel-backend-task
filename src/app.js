const express = require('express');
const bodyParser = require('body-parser');
const {sequelize} = require('./model')
const {getProfile} = require('./middleware/getProfile')
const app = express();
app.use(bodyParser.json());
app.set('sequelize', sequelize)
app.set('models', sequelize.models)

/**
 * Get contract data for the given id and profile
 * @returns Contract
 */
app.get('/contracts/:id',getProfile ,async (req, res) =>{
    const {Contract} = req.app.get('models')
    const {id} = req.params
    const ContractorId = req.profile.get('id')

    const contract = await Contract.findOne({where: {id, ContractorId}})
    if(!contract) return res.status(404).end()
    res.json(contract)
})
module.exports = app;
