const express = require("express");
const router = express.Router();
const login = require('./login')
const signup = require('./signup')
const auth = require('../middleware/auth')
const userPage = require('./userPage')



router.use(login)
router.use(signup)
//router.use(auth(), userPage)
router.use(userPage)


module.exports = router;