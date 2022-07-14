const user = require('./models/user')
const stocks = require('./models/stocks')
const stockPrice = require('./models/stockPrice')
const userStocks = require('./models/userStocks')
const { default: axios } = require('axios')
const fs = require('fs');


const stockPriceSync = () => {
    stockPrice.sync({force:true}).then(() => {
        console.log('sync started')
        const newStockPrice = stockPrice.build({ symbol: 'AAPL', price: 145.49});
        return newStockPrice.save();
    }).then(() => {
        const newStockPrice = stockPrice.build({ symbol: 'GOOG', price: 2243.74});
        return newStockPrice.save();
    }).then(() => {
        const newStockPrice = stockPrice.build({ symbol: 'ROKU', price: 87.02});
        return newStockPrice.save();
    }).then(() => {
        const newStockPrice = stockPrice.build({ symbol: 'ZM', price: 101.01});
        return newStockPrice.save();
    }).then(() => {
        
        console.log('sync sucessful')
    })
}

stockPriceSync()

module.exports = { stockPriceSync }