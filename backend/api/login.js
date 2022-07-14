const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

const user = require('../models/user')




router.post('/login', async (req, res) => {
    const { email, password: pass } = req.body
    //console.log('token: ', req.token('token'))

    const User = await user.findOne({where: { email }});
    //const User = await user.findAll({ attributes: ['id', 'email', 'password'], where: { email } });

    if (!User) {
        return res.status(401).send('Unable to login!');
    }
    const isMatch = await bcrypt.compare(pass, User.password);
    console.log('pass: ', pass, ' password: ', User.password)
    console.log('pass: ', User.email, ' password: ', User.username)

    const JSONUser = ({
        id: User.id,
        username: User.username,
        email: User.email
    })
            

    if (!isMatch) {
        return res.status(401).send('Incorrect password!');
    }
    console.log('got here2', User)
    const secretKey = process.env.SECRET_JWT || "";
    
    console.log('user', User)
    console.log('JSONUser', JSONUser)
    const token = jwt.sign({ user: JSONUser }, secretKey, {//swap to user not just id
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