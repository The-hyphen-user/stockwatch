const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check } = require('express-validator');
const dotenv = require("dotenv");
dotenv.config();
const user = require("../models/user");

const validateSignup = [
  check('username')
      .exists({ checkFalsy: true })
      .withMessage('Username cannot be blank.')
      .isLength({ min: 6 })
      .withMessage('Please provide a username with at least 6 characters.'),
  check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
  check('email')
      .exists({ checkFalsy: true })
      .withMessage('Email cannot be blank.')
      .isEmail()
      .withMessage('Please provide a valid email.'),  
  check('password')
      .exists({ checkFalsy: true })
      .withMessage('Password cannot be blank.')
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
];

router.post("/api/login", async (req, res) => {
  const { email, password: pass } = req.body;
  console.log("logging in: ", email, pass);
  const User = await user.findOne({ where: { email } });
  if (!User) {
    //console.log("got here");
    return res.status(401).send("Unable to login!");
  }

  //console.log("got here");
  const isMatch = await bcrypt.compare(pass, User.password);
  if (!isMatch) {
    return res.status(401).send("Incorrect password!");
  }

  const JSONUser = {
    id: User.id,
    username: User.username,
    email: User.email,
  };

  //console.log("got here2", User);
  const secretKey = process.env.SECRET_JWT || "";

  //console.log("user: ", User, " JSONUser: ", JSONUser);
  const token = jwt.sign({ user: JSONUser }, secretKey, {
    expiresIn: "24h",
  });
  //console.log("login sending token: ", token);

  res.send({ token: token });
});

module.exports = router;
