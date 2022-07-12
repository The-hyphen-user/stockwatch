const express = require("express");
const router = express.Router();
const user = require('../models/user')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv');
dotenv.config();


router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body//needs validation
    
    console.log('submitting, Email: ', email)
    const dupUser = await user.findOne({ attributes: ['id', 'email', 'password'], where: { email } });
    if (dupUser) {
        res.send({ message: 'dup user' })
    } else {
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 8);
            console.log('hashedPassword: ', hashedPassword, ' password: ', password)
            const newUser = await user.create({ username, email, password: hashedPassword })
            if (!newUser) {
                return res.status(500).send('Something went wrong');
            }
            res.status(201).send('User was created!');

        }
    }

})
module.exports = router;