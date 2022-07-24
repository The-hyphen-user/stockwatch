const express = require("express");
const router = express.Router();

router.get("/logout", (req, res) => {
  //if headers have token named token, delete it
  if (req.headers.token) {
    delete req.headers.token;
  }
  res.send("logged out");
});

module.exports = router;
