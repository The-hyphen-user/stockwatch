const express = require('express');
const router = express.Router();
const signup = require('../api/signup')
const login = require('../api/login')
const api = require('../api')
const {auth, auth2, auth3} = require('../middleware/auth')
const userPage = require('../api/userPage')
const stock = require('../api/stock')
const balance = require('../api/balance')
const purchase = require('../api/purchaseStock')
const firstLoginCheck = require('../middleware/firstLogincheck')




//router.use('/api', api)
router.post('/api/signup', signup)
router.post('/api/login', login)
router.get('/api/userPage', auth, userPage)



//router.post('/api', signup)
//router.get('/protected', auth() )
//router.get('/user:user', auth2(), userPage)
//router.get('/user:user', auth2(), firstLoginCheck, userPage)
router.get('/user:user', auth2(), userPage)
router.get('/balance:id', auth3(), balance)
router.get('/stocks:symbol', stock)
router.post('/purchase', auth(), purchase)
//router.post('/purchase', purchase)

module.exports = router;