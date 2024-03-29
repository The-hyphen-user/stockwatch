const express = require("express");
const router = express.Router();
const user = require("../models/user");
const stockPrice = require("../models/stockPrice");
const moment = require("moment");
const userStocks = require("../models/userStocks");
const userRevenue = require("../models/userRevenue");
const dotenv = require("dotenv").config();

//should only be run once per day
//should be run every day
//should be run when stock market is paused

const calculateWealth = async () => {
  try {
    const calculateUsersWealth = async (user) => {
      var wealth = user.balance;
      console.log("user.balance: ", user.balance);
      const UserStocks = await userStocks.findAll({
        where: { id: user.id },
      });
      for (let UserStock of UserStocks) {
        const StockPrice = await stockPrice.findOne({
          where: { symbol: UserStock.symbol },
        });
        wealth += StockPrice.price * UserStock.amount;
      }
      return wealth;
    };

    const Users = await user.findAll();
    const loop = async () => {
      for (const user of Users) {
        const Value = await calculateUsersWealth(user);
        user.update({
          wealth: Value,
        });
        console.log("user.wealth: ", user.wealth);
        userRevenue.create({
          id: user.id,
          date: moment().format("YYYY-MM-DD"),
          wealth: user.wealth,
        });
      }
    };
    loop();
  } catch (err) {
    console.log("err: ", err);
  }
};

calculateWealth();

module.exports = { calculateWealth };
