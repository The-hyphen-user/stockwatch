const express = require("express");
const router = express.Router();
const stockPrice = require("../models/stockPrice");
const stocks = require("../models/stocks");
const moment = require("moment");
const dotenv = require("dotenv").config();
const apiCall = require("../finnhub/apiCall");
const user = require("../models/user");
const userStocks = require("../models/userStocks");

//router purchase stock if balance is high enough
router.post("/purchase", async (req, res) => {
  const { id, ticker} = req.body;
  const amount = Number(req.body.amount)
  //console.log(res)
  const User = await user.findOne({ where: { id: id } });
  
  const balance = User.balance;
  console.log('balance: ', User)
   res.send("purchased" );
  

  //get balance for user from database
  //check if stock.updatedAt is recent enough
  //console.log('got here3 balance: ', User.balance, "ticker: ", ticker);
  const stock = await stocks.findOne({ where: { symbol: ticker } });
  //console.log('got here2 stock: ', stock);
  if (stock && User && balance) {
    const stockUpdateTime = moment(stock.updatedAt);
    const tenMinAgo = moment(moment.utc().subtract(30, "minutes").toDate());
    if (stockUpdateTime.isBefore(tenMinAgo)) {
      console.log("too old data"); //need to update prices
      apiCall.getStockPrice(ticker, async (error, data, response) => {
        //console.log(data);
        stockPrice.update({ price: data.c }, { where: { ticker: ticker } });
        if (data.c * number(amount) <= number(balance)) {
          user.update(
            { balance: number(balance) - data.c * number(amount) },
            { where: { id: id } }
          );
          const UserStock = await userStocks.findAll({
            where: { user_id: id, ticker: ticker },
          });
          if (UserStock) {
            userStocks.update(
              { amount: number(UserStock.amount) + number(amount) },
              { where: { user_id: id, ticker: ticker } }
            );
          } else {
            userStocks.create({
              user_id: id,
              ticker: ticker,
              amount: amount,
            });
          }
          console.log('sending this?')
          //return res.send({message:"purchased"});
        } else {
          console.log('sending this?')
          //return res.send({ error: "Insufficient funds" });
        }
        return response.send({ message: "purchased" });
      });
    } else {
      //old prices are recent enough
      const freshStock = await stockPrice.findOne({
        where: { symbol: ticker },
      });
      const price = freshStock.price;
      if (price * amount <= balance) {
        user.update(
          { balance: balance - price * amount },
          { where: { id: id } }
        );
        const UserStock = await userStocks.findOne({
          where: { user_id: id, ticker: ticker },
        });
        
        if (UserStock) {
          userStocks.update(
            { amount: UserStock.amount + amount },
            { where: { user_id: id, ticker: ticker } }
          );
        } else {
          userStocks.create({
            user_id: id,
            ticker: ticker,
            amount: amount,
          });
        }
         console.log("purchased!");
         //return res.send("purchased!");
        // console.log("purchased2");
      } else {
        console.log('got here Insufficient funds');
        //return res.json({ error: "Insufficient funds" });
      }
    }
  } else {
    //send error message didn't find stock
        console.log("purchased2");
    //return res.send({ message: "didn't find stock" });
    //return;
  }
  console.log("purchased...");
  //res.send("purchased" );
  console.log("purchased2");
  
})

module.exports = router;

/**
 * 
 * 
 * 
 * 
            
            if (balance >= amount * data.c) {
 * 
 * 
 * router.post("/purchase", async (req, res) => {
    const { user_id, ticker, amount } = req.body;
    const userStocks = await stocks.findOne({ where: { user_id: user_id, ticker: ticker } });
    if (userStocks) {
        res.json({
            message: "stock already owned"
        });
    } else {
        const userBalance = await apiCall.getBalance(user_id);
        if (userBalance >= amount) {
            const newStock = await stocks.create({
                user_id: user_id,
                ticker: ticker,
                amount: amount
            });
            res.json({
                message: "stock purchased"
            });
        } else {
            res.json({
                message: "not enough balance"
            });
        }
    }
}
);
 */
