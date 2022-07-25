const express = require("express");
const router = express.Router();
const user = require("../models/user");
const stockPrice = require("../models/stockPrice");
const moment = require("moment");
const userStocks = require("../models/userStocks");
const dotenv = require("dotenv").config();



const calculateWealth = async () => {
  try {



    const calculateUsersWealth = async (user) => {
      var  wealth = user.balance;
      console.log("user.balance: ", user.balance);
      const UserStocks = await userStocks.findAll({
        where: { user_id: user.id },
        });
        for (let UserStock of UserStocks) {
          const StockPrice = await stockPrice.findOne({
            where: { symbol: UserStock.ticker },
          });
          wealth += StockPrice.price * UserStock.amount;
        }
      return wealth
    }

    const Users = await user.findAll();
    const loop = async () => {
      for (const user of Users) {
        const Value = await calculateUsersWealth(user);
        user.update({
          wealth: Value,
        });
        console.log("user.wealth: ", user.wealth);
      }
    };
    loop();

  } catch (err) {
    console.log("err: ", err);
  }
};

calculateWealth();

module.exports = { calculateWealth };
