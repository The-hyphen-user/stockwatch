const userStocks = require('./models/userStocks')
const { default: axios } = require('axios')
const fs = require('fs');






const userStocksSync = () => {
    userStocks.sync({force:true}).then(() => {
        console.log('sync sucessful')
        const newUserStock = userStocks.build({ user_id: 1, ticker: 'AAPL', amount: 5 });
        return newUserStock.save();
    }).then(() => {
        console.log('sync sucessful')
        const newUserStock = userStocks.build({ user_id: 1, ticker: 'GOOG', amount: 2 });
        return newUserStock.save();
    }).then(() => {
        console.log('sync sucessful')
        const newUserStock = userStocks.build({ user_id: 1, ticker: 'ROKU', amount: 10 });
        return newUserStock.save();
    }).then(() => {
        console.log('sync sucessful')
        const newUserStock = userStocks.build({ user_id: 2, ticker: 'AAPL', amount: 10 });
        return newUserStock.save();
    }).then(() => {
        console.log('sync sucessful')
        const newUserStock = userStocks.build({ user_id: 2, ticker: 'GOOG', amount: 1 });
        return newUserStock.save();
    }).then(() => {
        console.log('sync sucessful')
        const newUserStock = userStocks.build({ user_id: 3, ticker: 'AAPL', amount: 15 });
        return newUserStock.save();
    }).then(() => {
        console.log('sync sucessful')
        const newUserStock = userStocks.build({ user_id: 3, ticker: 'ZM', amount: 5 });
        return newUserStock.save();
    })
}



userStocksSync(); //for calling with node
 module.exports = { userStocksSync }