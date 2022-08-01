const express = require("express");
const router = express.Router();
const user = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userStocks = require("../models/userStocks");
const stockPrice = require("../models/stockPrice");
const moment = require("moment");
const dotenv = require("dotenv").config();
const finnhub = require("finnhub");
const stocks = require("../models/stocks");

const env = process.env.FINNHUB_API_key;

const api_key = finnhub.ApiClient.instance.authentications["api_key"];
api_key.apiKey = env; // Replace this
const finnhubClient = new finnhub.DefaultApi();

router.get("/user:id", async (req, res) => {
  const id = req.params.id;
  lookedUpStocks = [];
  const promises = [];

  const getData = (stock) => {
    const localStoredStock = stockPrice.findAll({
      where: { symbol: stock.symbol },
    });
    if (localStoredStock) {
      //has local price?
      var localUpdateTime = moment(localStoredStock.updatedAt);
      var tenMinAgo = moment(moment.utc().subtract(30, "minutes").toDate());
      if (localUpdateTime.isBefore(tenMinAgo)) {
        //price is not recent enough?
        return getStockFromFinnhub(stock);
      } else {
        //price is recent enough
        return getStockFromLocalStorage(stock);
      }
    } else {
      //stock not in local storage
      return getStockFromFinnhub(stock);
    }
  };

  const getStockFromFinnhub = (stock) => {
    //console.log("too old data: ", stock);
    finnhubClient.quote(stock.symbol, (error, data, response) => {
      //console.log(data);
      //async stockPrice.update(//can i async here for performance?
      stockPrice.update({ price: data.c }, { where: { symbol: stock.symbol } });
      const responceStock = {
        symbol: stock.symbol,
        price: data.c,
        quantity: stock.amount,
      };
      return responceStock;
    });
  };
  const getStockFromLocalStorage = (stock) => {
    //console.log("stock is recent enough: ", stock);
    return (localStoredStock = stockPrice
      .findOne({
        where: { symbol: stock.symbol },
      })
      .then((localStoredStock) => {
        //console.log("localStoredStock: ", localStoredStock);
        const responceStock = {
          symbol: stock.symbol,
          price: localStoredStock.price,
          quantity: stock.amount,
        };
        return responceStock;
      }).then((responceStock) => {
        //add the description to responce stock taken from stocks
        return stocks.findOne({
          where: { symbol: responceStock.symbol },
        }).then((stock) => {
          responceStock.description = stock.description;
          return responceStock;
        })
      })
      );
  };

  const calcWealth = (stocks, balance) => {
    let wealth = 0;
    stocks.forEach((stock) => {
      wealth += stock.price * stock.quantity;
    }
    );
    wealth += balance;
    return wealth;
  }



  const User = await user.findOne({ where: { id: id } });
  const Stocks = await userStocks.findAll({ where: { id: id } }); //, raw: true
  if (Stocks) {
    Stocks.map((stock) => {
      promises.push(getData(stock));
    });
    //after all stocks have been getData then send them in an array as responce
    Promise.all(promises).then((data) => {
      console.log("ALL DATA FOR THE LOGIN SEND: ", {
        balance: User.balance,
        privacy: User.privacy,
        stocks: data,
      });
      const wealth = calcWealth(data, User.balance);
      res.send({ balance: User.balance, privacy:User.privacy, wealth, stocks: data });
    });
  }
});

module.exports = router;
