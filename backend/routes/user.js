const express = require('express');
const router = express.Router();
const signup = require('../api/signup')
const login = require('../api/login')
const api = require('../api')
const {auth, auth2} = require('../middleware/auth')
const userPage = require('../api/userPage')
const stock = require('../api/stock')
const balance = require('../api/balance')



router.use('/api', api)
//router.post('/api', signup)
//router.get('/protected', auth() )
//router.get('/user:user', auth2(), userPage)
router.get('/user:user', auth2(), userPage)
router.get('/balance:id', auth(), balance)
router.get('/stocks:symbol', stock)

module.exports = router;