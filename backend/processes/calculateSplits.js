const express = require("express");
const router = express.Router();
const user = require("../models/user");
const stockPrice = require("../models/stockPrice");
const moment = require("moment");
const userStocks = require("../models/userStocks");
const dotenv = require("dotenv").config();
const finnhub = require("finnhub");
const sequelize = require("sequelize");
const { Sequelize } = require("sequelize");

const env = process.env.FINNHUB_API_key;

const api_key = finnhub.ApiClient.instance.authentications["api_key"];
api_key.apiKey = env; // Replace this
const finnhubClient = new finnhub.DefaultApi();

const calculateSplits = async () => {
  console.log("💀starting calculateSplits");
  try {
    const splitTest = (symbol) => {
      //tests if the stock has split

      const today = moment(moment.utc(), "YYYY-MM-DD", true)
        .add(0, "days")
        .format("YYYY-MM-DD");
      const yesterday = moment(moment.utc(), "YYYY-MM-DD", true)
        .subtract(1, "days")
        .format("YYYY-MM-DD");
      finnhubClient.stockSplits(
        [symbol],
        yesterday,
        today,
        (error, data, response) => {
          if (data[0]) {
            const factor = data[0].toFactor;
            //console.log('splits: ', data)
            //console.log('🔪splits: ',data[0].symbol, ' factor: ', data[0].toFactor, ' Date: ', moment(data[0].date).format('YYYY-MM-DD'))
            userStocks.update(
              {
                amount: sequelize.literal(`amount * ${factor}`),
              },
              {
                where: { symbol: symbol },
              }
            );
          }
        }
      );
      //console.log("today: ", today)
    };

    userStocks
      .findAll({
        attributes: [
          [Sequelize.fn("DISTINCT", Sequelize.col("symbol")), "symbol"],
        ],
      })
      .then((UserStocks) => {
        UserStocks.forEach((UserStock) => {
          console.log("🌽checking splits of : ", UserStock.symbol);
          splitTest(UserStock.symbol);
        });
      });
  } catch (err) {
    console.log("err: ", err);
  }
};

calculateSplits();

module.exports = { calculateSplits };
