const {getJobsSumPerProfession} = require("../../../jobs/jobRepository");

const getBestProfessionUsecase =  async(start, end) =>
{
    return getJobsSumPerProfession(start, end)
}

module.exports = getBestProfessionUsecase