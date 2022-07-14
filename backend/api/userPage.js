const express = require("express");
const router = express.Router();
const user = require('../models/user')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs')
const userStocks = require('../models/userStocks')
const dotenv = require('dotenv');
dotenv.config();





router.get('/user:id', async (req, res) => {
    //already authed
    const id = req.params.id
    console.log('id: ', id)
    const Stocks = await userStocks.findAll({ where: { user_id: id }});//, raw: true 
    // if (Stocks) {
    //     const JSONStocks = ([])
    //     Stocks.forEach(element => {
    //         JSONStocks.push(element.toJSON())
    //         console.log('element', element)
    //     });

    //     console.log('stocks: ', Stocks, ' id: ', id, ' to json: ', JSONStocks)
    // } else {
    //     console.log('no stocks found')
    // }
    const fakeStocks = ([
        { user_id: 2, ticker: 'AAPL', amount: 10 },//, createdAt: '2022-07-12T20:15:35.000Z', updatedAt: '2022-07-12T20:15:35.000Z'
        { user_id: 2, ticker: 'GOOG', amount: 1 }//, createdAt: '2022-07-12T20:15:35.000Z', updatedAt: '2022-07-12T20:15:35.000Z'
    ])
    //res.send(fakeStocks)
    res.send(Stocks)
})
// const JSONStocks =([])
//     Stocks.forEach(element => {
//         JSONStocks.push(element.toJSON())
//     });

//console.log('Json to be sent: ', JSONStocks)

// if (!Stocks) {
//     return res.send(null);
// }
//res.send({stocks: Stocks})
//res.json(JSONStocks)
//res.send(Stocks)
















module.exports = router;