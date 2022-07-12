const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

const user = require('../models/user')




router.post('/login', async (req, res) => {
    const { email, password: pass } = req.body
    console.log(email)

    const User = await user.findOne({where: { email }});
    //const User = await user.findAll({ attributes: ['id', 'email', 'password'], where: { email } });

    if (!User) {
        return res.status(401).send('Unable to login!');
    }
    const isMatch = await bcrypt.compare(pass, User.password);
    console.log('pass: ', pass, ' password: ', User.password)
    console.log('pass: ', User.email, ' password: ', User.username)
    console.log('got here')
            

    if (!isMatch) {
        return res.status(401).send('Incorrect password!');
    }
    console.log('got here2')
    const secretKey = process.env.SECRET_JWT || "";
    const token = jwt.sign({ id: User.id.toString() }, secretKey, {//swap to user not just id
        expiresIn: '24h'
    });
    console.log('got here3', token)

    //const { password, ...userWithoutPassword } = user;

    res.send({ token: token });








    // if (!User) { console.log('no user') }
    // const validPassword = (JSON.stringify(password) === JSON.stringify(User[0].password));
    // if (!validPassword) {
    // }
    // console.log('USER: ', User[0].id)
    // const secretKey = process.env.SECRET_JWT;
    // const token = jwt.sign({ id: JSON.stringify(User[0].id) }, secretKey, {
    //     expiresIn: '24h'
    // });

    // res.send({ token })
})




module.exports = router;