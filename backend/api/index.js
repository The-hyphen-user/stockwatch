const express = require("express");
const router = express.Router();
const login = require('./login')
const signup = require('./signup')



router.use(login)
router.use(signup)



module.exports = router;