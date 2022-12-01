const express = require("express");
const router = express.Router();
const user = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require('express-validator');
const dotenv = require("dotenv");
dotenv.config();

const signupValidators = [
  check('username')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a value for Username')
      .isLength({ max: 20 })
      .withMessage('Username must not be more than 20 characters')
      .custom((value) => {
          return User.findOne({ where: { username: value } })
              .then((user) => {
                  if (user) {
                      return Promise.reject('The provided Username is already in use');
                  }
              });
      }),
  check('email')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a value for email')
      .isLength({ max: 50 })
      .withMessage('Email address must not be more than 50 characters')
      .custom((value) => {
          return User.findOne({ where: { email: value } })
              .then((user) => {
                  if (user) {
                      return Promise.reject('The provided Email Address is already in use');
                  }
              });
      }),
  check('password')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a value for Password')
      .isLength({ min: 6, max: 24 })
      .withMessage('Password must be more than 5 characters and less than 25 characters long')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
      .withMessage('Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'),
];

router.post("/api/signup", async (req, res) => {//include signupValidators
  const { username, email, password } = req.body; //needs validation

  console.log("submitting, Email: ", email);
  const dupUser = await user.findOne({
    attributes: ["id", "email", "password"],
    where: { email },
  });
  if (dupUser) {
    res.send({ message: "dup user" });
  } else {
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 8);
      console.log("hashedPassword: ", hashedPassword, " password: ", password);
      const newUser = await user.create({
        username,
        email,
        balance: 10000,
        wealth: 10000,
        privacy: true,
        password: hashedPassword,
      });
      if (!newUser) {
        return res.status(500).send("Something went wrong");
      }
      const login = {
        email,
        password,
      };
      const secretKey = process.env.SECRET_JWT;

      const loginToken = jwt.sign({ login: login }, secretKey, {
        //swap to user not just id
        expiresIn: "24h",
      });
      res.send({ login: loginToken });

      //res.status(201).send('User was created!');
    }
  }
});
module.exports = router;



// npm install @mui/material @emotion/react @emotion/styled