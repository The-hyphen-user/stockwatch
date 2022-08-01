const express = require("express");
const router = express.Router();
const user = require("../models/user");
const stockPrice = require("../models/stockPrice");
const moment = require("moment");
const userStocks = require("../models/userStocks");
const dotenv = require("dotenv").config('../.env');
const finnhub = require("finnhub");

const env = process.env.FINNHUB_API_key;

const api_key = finnhub.ApiClient.instance.authentications["api_key"];
api_key.apiKey = env; // Replace this
const finnhubClient = new finnhub.DefaultApi();



const Atime = async ()  => {
    console.log("time: ", moment.utc());
    const today = moment(moment.utc(), 'YYYY-MM-DD', true).add(1, 'days').format('YYYY-MM-DD');
    const yesterday = moment(moment.utc(), 'YYYY-MM-DD', true).subtract(300, 'weeks').format('YYYY-MM-DD');
    console.log("today: ", today);
    

    finnhubClient.stockSplits([ "AAPL"], yesterday, today, (error, data, response) => {
        console.log('splits: ', data)
        console.log(
            moment(moment.utc(), 'YYYY-MM-DD', true).format('YYYY-MM-DD'))
    });

}

Atime()

module.exports = { Atime };


