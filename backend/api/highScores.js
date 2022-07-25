//router get that returns an array of high scores based on wealthiest users
const express = require("express");
const router = express.Router();
const user = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userStocks = require("../models/userStocks");
const stockPrice = require("../models/stockPrice");
const moment = require("moment");
const dotenv = require("dotenv").config();

router.get("/highscores:count", async (req, res) => {
  const count = Number(req.params.count);
  console.log("count: ", count);
  const Users = await user.findAll({
    where: {
        privacy: true,
    },
    order: [["wealth", "DESC"]],
    limit: count,
  });
    console.log("Users: ", Users);
  const UsersWithWealth = Users.map((user) => {
    return {
      username: user.username,
      wealth: user.wealth,
    };
  });

  res.send(UsersWithWealth);
});
module.exports = router;
