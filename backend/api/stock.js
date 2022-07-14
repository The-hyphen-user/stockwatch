const express = require("express");
const router = express.Router();
const finnhub = require('finnhub');
const dotenv = require('dotenv').config()
const moment = require('moment')
const apiCall = require('../finnhub/apiCall')

const stocks = require('../models/stocks');
const stockPrice = require("../models/stockPrice");

const env = process.env.FINNHUB_API_key

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = env // Replace this
const finnhubClient = new finnhub.DefaultApi()

router.get('/stocks:id', async (req, res) => {
    const id = req.params.id;
    const Stock = await  stocks.findOne({ where: { symbol: id } })
    console.log('da symbol: ', Stock.symbol)
    const localStockPrice = await  stockPrice.findOne({where : {symbol :Stock.symbol}})
    // if (localStockPrice) {
    //     console.log('localStockPrice: ', localStockPrice.price)
    //     console.log('localStockPrice-updated: ', localStockPrice.updatedAt)
    //     console.log('date: ', moment.utc().subtract(10, 'minutes').toDate())
    //     var local = moment(localStockPrice.updatedAt)
    //     var tenMinAgo = moment(moment.utc().subtract(10, 'minutes').toDate())
    //     if (local.isBefore(tenMinAgo)){
    //         console.log('too old data')
    //         finnhubClient.quote(Stock.symbol, (error, data, response) => {
    //             console.log(data)
    //              stockPrice.update({ price: data.c }, {
    //                 where: {
    //                   symbol: Stock.symbol
    //                 }
    //               });
    //               res.send(data.c)
    //         })

    //     } else {
    //         console.log('data is good123: ', localStockPrice.price)
    //         res.send({price: localStockPrice.price})
    //     }
        
    // } else {
    //     if(Stock) {
    //     //look up stock and insert into stockprice table
    //     finnhubClient.quote(Stock.symbol, (error, data, response) => {
    //         console.log(data)
    //         stockPrice.create({symbol: Stock.symbol, price: data.c })
    //         res.send(data.c)
    //     });
    //     } else{
    //         //bad search
    //     }

    // }



    res.send(Stock)



})


module.exports = router;