// const express = require("express");
// const router = express.Router();
// const stockPrice = require("../models/stockPrice");
// const stocks = require("../models/stocks");
// const moment = require("moment");
// const dotenv = require("dotenv").config();
// const apiCall = require("../finnhub/apiCall");
// const user = require("../models/user");

// //router purchase stock if balance is high enough
// router.post("/purchase", async (req, res) => {
//   const { id, ticker, amount } = req.body;
//   const User = await user.findOne({ where: { id: id } });
//   //get balance for user from database
//   const balance = User.balance;
//   //check if stock.updatedAt is recent enough
//   const stock = await stocks.findOne({ where: { ticker: ticker } });
//   if (stock) {
//     const stockUpdateTime = moment(stock.updatedAt);
//     const tenMinAgo = moment(moment.utc().subtract(30, "minutes").toDate());
//     if (stockUpdateTime.isBefore(tenMinAgo)) {
//       //console.log("too old data"); //need to update prices
//       apiCall.getStockPrice(ticker, (error, data, response) => {
//         //console.log(data);
//         stockPrice.update({ price: data.c }, { where: { ticker: ticker } });
//         const responceStock = {
//           symbol: ticker,
//           price: data.c,
//           quantity: amount,
//         };
//       });
//     } else {
//       //old prices are recent enough
//       const responceStock = {
//         symbol: ticker,
//         price: stock.price,
//         quantity: amount,
//       };
//     }

//     //check if balance is high enough to buy stocks
//     if (balance >= amount * responceStock.price) {
//       //update user balance
//       user.update(
//         { balance: balance - amount * responceStock.price },
//         { where: { id: user_id } }
//       );
//       //add stock to userStocks table
//       userStocks.create({ user_id: user_id, ticker: ticker, amount: amount });
//       //add stock to stockPrice table
//       stockPrice.create({ symbol: ticker, price: responceStock.price });
//       res.json({message: "purchased stock"});
//     } else {
//       res.json({ error: "Insufficient funds" });
//     }
//   } else {
//     //send error message didn't find stock
//     res.send("didn't find stock");
//   }
// });

// module.exports = router;

// /**
//  *
//  *
//  *
//  *

//             if (balance >= amount * data.c) {
//  *
//  *
//  * router.post("/purchase", async (req, res) => {
//     const { user_id, ticker, amount } = req.body;
//     const userStocks = await stocks.findOne({ where: { user_id: user_id, ticker: ticker } });
//     if (userStocks) {
//         res.json({
//             message: "stock already owned"
//         });
//     } else {
//         const userBalance = await apiCall.getBalance(user_id);
//         if (userBalance >= amount) {
//             const newStock = await stocks.create({
//                 user_id: user_id,
//                 ticker: ticker,
//                 amount: amount
//             });
//             res.json({
//                 message: "stock purchased"
//             });
//         } else {
//             res.json({
//                 message: "not enough balance"
//             });
//         }
//     }
// }
// );
//  */
