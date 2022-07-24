const express = require("express");
const router = express.Router();
const stockPrice = require("../models/stockPrice");
const stocks = require("../models/stocks");
const moment = require("moment");
const dotenv = require("dotenv").config();
const apiCall = require("../finnhub/apiCall");
const user = require("../models/user");
const userStocks = require("../models/userStocks");
const finnhub = require("finnhub");

router.post("/sell", async (req, res) => {
  const { id, ticker } = req.body;
  const amount = Number(req.body.amount);

  const sellStock = async ({ User, Stock, userStock, StockPrice, amount }) => {
    User.balance = User.balance + StockPrice.price * amount;
    User.save();
    userStock.amount = userStock.amount - amount;
    console.log("#", userStock.amount, amount);
    userStock.save();
    return true;
  };

  async function getInfo({ id, ticker }) {
    const User = await user.findOne({ where: { id: id } });
    const Stock = await stocks.findOne({ where: { symbol: ticker } }); //, raw: true
    const userStock = await userStocks.findOne({
      where: { ticker: ticker, user_id: id },
    });
    const StockPrice = await stockPrice.findOne({ where: { symbol: ticker } });
    if (User && Stock && userStock && StockPrice) {
      if (userStock.amount >= amount) {
        return sellStock({ User, Stock, userStock, StockPrice, amount });
      } else {
        res.send("You don't have enough stock to sell");
      }
    } else {
      res.send("You don't have enough stock to sell");
    }
  }
  const success = await getInfo({ id, ticker });
  if (success) {
    res.send("success");
  } else {
    res.send("fail");
  }
});

module.exports = router;
