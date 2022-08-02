const express = require("express");
const router = express.Router();
const user = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userStocks = require("../models/userStocks");
const stockPrice = require("../models/stockPrice");
const moment = require("moment");
const dotenv = require("dotenv").config();

router.post("/privacy:id", async (req, res) => {
  //toggles the sql table user_privacy
  const { privacy } = req.body;
  const id = req.params.id;
  const User = await user.findOne({
    where: {
      id: id,
    },
  });
  if (User) {
    if (User.privacy === privacy) {
      res.send(true);
    } else {
      await User.update({
        privacy: privacy,
      });
      res.send(true);
    }
  } else {
    res.send(false);
  }
});

module.exports = router;
