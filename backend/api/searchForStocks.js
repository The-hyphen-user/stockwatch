const express = require("express");
const router = express.Router();
const dotenv = require("dotenv").config();
const stocks = require("../models/stocks");
const stockPrice = require("../models/stockPrice");
// const Sequelize = require("sequelize");
const { Op } = require("sequelize");




router.get('/search:query/:maxReturnQuantity', async (req, res) => {
    //doesnt need auth
    console.log('🍓dot')
    const query = req.params.query;
    const maxReturnQuantity = Number(req.params.maxReturnQuantity);
    console.log("query: ", query, "maxReturnQuantity: ", maxReturnQuantity);
    const results = await stocks.findAll({//
        where: {
            description : {
                [Op.like]: `%${query}%`
            }
        },
        limit: maxReturnQuantity,

    })
    console.log("results: ", results);
    res.json(results);
    

})


module.exports = router;