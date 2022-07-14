const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

const stocks = require('../models/stocks')

router.get('/stocks:id', async (req, res) => {
    const id = req.params.id;
    const Stock = await stocks.findOne({ where: { symbol: id } })
    console.log(Stock)




    res.send(Stock)



})


module.exports = router;