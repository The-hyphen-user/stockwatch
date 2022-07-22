

// const express = require("express");
// const router = express.Router();
// const user = require('../models/user')
// const jwt = require("jsonwebtoken");
// const bcrypt = require('bcryptjs')
// const userStocks = require('../models/userStocks')
// const stockPrice = require("../models/stockPrice");
// const moment = require("moment");
// const dotenv = require('dotenv').config();
// const finnhub = require("finnhub");

// const env = process.env.FINNHUB_API_key;

// const api_key = finnhub.ApiClient.instance.authentications["api_key"];
// api_key.apiKey = env; // Replace this
// const finnhubClient = new finnhub.DefaultApi();





// router.get('/user:id', async (req, res) => {
//     //already authed
//     const id = req.params.id
//     console.log('id: ', id)
//     const newStock = []
    
//     console.log('mapping time0')
//     const Stocks = await userStocks.findAll({ where: { user_id: id }});//, raw: true 
//     if (Stocks) {
        
//         console.log('mapping time1')
//         //Stocks.map(async (Stock) =>  {
//         for (const Stock of Stocks) {
            
//             //console.log('mapping time1.5', Stock)
//             const localStoredStock = await stockPrice.findOne({where: { symbol: Stock.ticker } });
//             //console.log('mapping time', localStoredStock)

//             ///////////////////////////////////////////////////////////////////////
//             if (localStoredStock) {//previous looked up and added to stock price table
//                 console.log('checking time')
//                 var localUpdateTime = moment(localStoredStock.updatedAt);
//                 var tenMinAgo = moment(moment.utc().subtract(30, "minutes").toDate());
//                 if (localUpdateTime.isBefore(tenMinAgo)) {
//                     console.log("too old data"); //need to update prices
//                     finnhubClient.quote(Stock.ticker, (error, data, response) => {
//                         console.log(data);
//                         stockPrice.update({ price: data.c },{where: { symbol: Stock.ticker,} });
//                         const responceStock = {
//                             symbol: Stock.ticker,
//                             price :data.c,
//                             quantity : Stock.amount
//                         }
//                         newStock.push(responceStock)
                        
//                     });
//                 } else {//old prices are recent enough
//                     const responceStock = {
//                         symbol: Stock.ticker,
//                         price: localStoredStock.price,
//                         quantity : Stock.amount
//                     }
//                     newStock.push(responceStock)
//                     console.log('pushing old price')
//                 }
//                 ///////////////////////////////////////////////////////////
//             } else {
//                 /////////////////////////////////////////////////////////////////

//                 finnhubClient.quote(Stock.ticker, (error, data, response) => {
//                     console.log(data);
//                     //stockPrice.update({ price: data.c },{where: { symbol: Stock.ticker,} });
//                     stockPrice.create({symbol: Stock.ticker, price: data.c})
//                     const responceStock = {
//                         symbol: Stock.ticker,
//                         price :data.c,
//                         quantity : Stock.amount
//                     }
//                     newStock.push(responceStock)
//                 });
//                 //////////////////////////////////////////////////////////////
//             }
//         }
//         console.log('send it', newStock)
//         res.send(newStock)
//     } else {
//         res.status(404)
//     }

//     const fakeStocks = ([
//         { user_id: 2, ticker: 'AAPL', amount: 10 },//, createdAt: '2022-07-12T20:15:35.000Z', updatedAt: '2022-07-12T20:15:35.000Z'
//         { user_id: 2, ticker: 'GOOG', amount: 1 }//, createdAt: '2022-07-12T20:15:35.000Z', updatedAt: '2022-07-12T20:15:35.000Z'
//     ])
//     //res.send(fakeStocks)
//     //res.send(Stocks)
// })
// // const JSONStocks =([])
// //     Stocks.forEach(Stock => {
// //         JSONStocks.push(Stock.toJSON())
// //     });

// //console.log('Json to be sent: ', JSONStocks)

// // if (!Stocks) {
// //     return res.send(null);
// // }
// //res.send({stocks: Stocks})
// //res.json(JSONStocks)
// //res.send(Stocks)









//     // if (Stocks) {
//     //     const JSONStocks = ([])
//     //     Stocks.forEach(Stock => {
//     //         JSONStocks.push(Stock.toJSON())
//     //         console.log('Stock', Stock)
//     //     });

//     //     console.log('stocks: ', Stocks, ' id: ', id, ' to json: ', JSONStocks)
//     // } else {
//     //     console.log('no stocks found')
//     // }







// module.exports = router;



