const userStocks = require("./models/userStocks");
const { default: axios } = require("axios");
const fs = require("fs");

const userStocksSync = () => {
  userStocks
    .sync()
    .then(() => {
      console.log("sync sucessful");
      const newUserStock = userStocks.build({
        user_id: 1,
        symbol: "AAPL",
        amount: 5,
      });
      return newUserStock.save();
    })
    .then(() => {
      console.log("sync sucessful");
      const newUserStock = userStocks.build({
        user_id: 1,
        symbol: "GOOG",
        amount: 2,
      });
      return newUserStock.save();
    })
    .then(() => {
      console.log("sync sucessful");
      const newUserStock = userStocks.build({
        user_id: 1,
        symbol: "ROKU",
        amount: 10,
      });
      return newUserStock.save();
    })
    .then(() => {
      console.log("sync sucessful");
      const newUserStock = userStocks.build({
        user_id: 2,
        symbol: "AAPL",
        amount: 10,
      });
      return newUserStock.save();
    })
    .then(() => {
      console.log("sync sucessful");
      const newUserStock = userStocks.build({
        user_id: 2,
        symbol: "GOOG",
        amount: 1,
      });
      return newUserStock.save();
    })
    .then(() => {
      console.log("sync sucessful");
      const newUserStock = userStocks.build({
        user_id: 3,
        symbol: "AAPL",
        amount: 15,
      });
      return newUserStock.save();
    })
    .then(() => {
      console.log("sync sucessful");
      const newUserStock = userStocks.build({
        user_id: 3,
        symbol: "ZM",
        amount: 5,
      });
      return newUserStock.save();
    });
};

userStocksSync(); //for calling with node
module.exports = { userStocksSync };
