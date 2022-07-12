// const express = require("express");
// const router = express.Router();
// const bcrypt = require('bcryptjs')
// const jwt = require("jsonwebtoken");
// const dotenv = require('dotenv');
// dotenv.config();

// const user = require('../models/user')




// router.post('/login', async(req, res) => {
//     const { username, email, password } = req.body
//     //console.log('got here???', email, {email})
//     const User = await user.findAll({ attributes: ['id', 'email', 'password'], where: { email } });
//     //const User = await user.findOne({ attributes: ['id', 'email', 'password'], where: { email } });    
//     //console.log('got here')
//     if (!User) {console.log('no user')}
//         //console.log('got here')
//         //const validPassword = await bcrypt.compare(password, User.password);
//         const validPassword = (JSON.stringify(password) === JSON.stringify(User[0].password));
//         if (!validPassword){
//             //throw new HttpException(401, 'Incorrect password!');
//             console.log('invalid password')
//             console.log('password1: ', password)
//             console.log('password2: ', JSON.stringify(User[0].password))
//             console.log('user: ', JSON.stringify(User[0].password))
//         }
//         console.log('USER: ', User[0].id)
//         const secretKey = process.env.SECRET_JWT;
//         const token = jwt.sign({ id: JSON.stringify(User[0].id)}, secretKey, {
//             expiresIn: '24h'
//         });

//         res.send({token})
// })




// module.exports = router;