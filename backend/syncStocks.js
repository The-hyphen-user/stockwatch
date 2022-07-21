//this is gana be a big one
const stocks = require('./models/stocks')
const fs = require('fs');

const data = require('./stocks.json')


//const allStocks = 
//import json file stocks.json



const stocksSync = () => {
    stocks.sync({force:true}).then(() => {
        console.log('sync started')
        data.forEach((stock) => {
            const newStock = stocks.create({ symbol: stock.symbol, description: stock.description, type: stock.type, currency: stock.currency });
            console.log(newStock)
        })
    })
}


stocksSync() //for calling with node
module.exports = { stocksSync }