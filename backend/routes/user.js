const express = require('express');
const router = express.Router();
const signup = require('../api/signup')
const login = require('../api/login')
const api = require('../api')
const auth = require('../middleware/auth')
const userPage = require('../api/userPage')



router.use('/api', api)
//router.post('/api', signup)
router.get('/protected', auth(), )
router.get('/user:user', auth(), userPage)

module.exports = router;