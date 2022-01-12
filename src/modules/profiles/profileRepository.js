const sequelize = require("sequelize");
const {Profile} = require("../../model");

const getProfile = async(profileId) => {
    return await Profile.findOne({where: {id: profileId}})
}

const updateBalance = async(profileId, value, operation, t) => {
    console.log(t)
    const profile = await Profile.findOne({where: {id: profileId}});
    const balance = profile.get('balance');
    const newBalance = (operation==='add') ? balance+value : balance-value;

    console.log(`Updating profileId:${profileId} balance from:${balance} to:${newBalance}`)
    profile.set({
        balance: newBalance
        })
    return await profile.save({ transaction: t })
}

module.exports = {
    getProfile,
    updateBalance
}