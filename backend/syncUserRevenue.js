const user = require("./models/user");
const stocks = require("./models/stocks");
const userStocks = require("./models/userStocks");
const { default: axios } = require("axios");
const moment = require("moment");



const userRevenue = require("./models/userRevenue");


const userRevenueSync = () => {
    //moment get todays day format YYY-MM-DD
    const today = moment().format("YYYY-MM-DD");
    console.log('today is: ', today);
    userRevenue
        .sync({ force: true })
        .then(() => {
            console.log("sync started");
            const newUserRevenue = userRevenue.build({
                id: 1,
                date: today,
                amount: 10000,
            });
            return newUserRevenue.save();
        })
    }

userRevenueSync()
module.exports = { userRevenueSync };