const getBestProfessionUsecase = require("./useCases/getBestProfession/getBestProfessionUseCase");
const listBestClientsUsecase = require("./useCases/listBestClients/listBestClientsUseCase");
const {AppError} = require("../../shared/AppError");

/**
 * Returns the profession that earned the most money in the given interval
 * @returns String
 */
const getBestProfession = async (req, res) =>{
    const {start, end} = req.query
    const bestProfession = await getBestProfessionUsecase(start, end);
    console.log(bestProfession);
    if(!bestProfession) throw new AppError('Unable to get best profession', 500)
    res.json(bestProfession)
}

/**
 * Returns the clients the paid the most for jobs in the given interval
 * @returns Profile[]
 */
const listBestClients = async (req, res) =>{
    const {start, end, limit} = req.query
    const bestClients = await listBestClientsUsecase(start, end, limit);
    if(!bestClients) throw new AppError('Unable to list best clients', 500)
    res.json(bestClients)
}

module.exports = {
    getBestProfession,
    listBestClients
}