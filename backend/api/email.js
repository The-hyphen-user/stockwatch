var nodemailer = require("nodemailer");
const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");

//express router for the /api/email route
router.post("/email", (req, res) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.fromEmailAddress,
      pass: process.env.emailPassword,
    },
  });

  var mailOptions = {
    from: process.env.fromEmailAddress,
    to: process.env.toEmailAddress,
    subject: "Stockwatch sending Email using Node.js",
    text: "req.body.message",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
});

module.exports = router;
