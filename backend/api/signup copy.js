// const express = require("express");
// const router = express.Router();
// const user = require('../models/user')
// const jwt = require("jsonwebtoken");
// const bcrypt = require('bcryptjs')
// const dotenv = require('dotenv');
// dotenv.config();




// router.post('/signup', async (req, res) => {
//     const { username, email, password } = req.body//needs validation


//     const dupUser = await user.findOne({ attributes: ['id', 'email', 'password'], where: { email } });
//     if (dupUser) {
//         //console.log('email: ', email)
//         res.send({ message: 'dup user' })
//     } else {
//         //console.log('unique')
//         if (password) {
//             const hashedPassword = await bcrypt.hash(password, 8);
//             //console.log(hashedPassword)
//             const newUser = await user.build({
//                 username: username,
//                 email: email,
//                 password: hashedPassword
//             })
//             newUser.save().then(() => {
//                 //res.send('user created')
//                 return user.findAll({ attributes: ['id', 'email', 'password'], where: { email } })
//             })
//             .then((data) => {
//                 const secretKey = process.env.SECRET_JWT;
//                 // const token = jwt.sign({ id: JSON.stringify(data[0].dataValues.id) }, secretKey, {
//                 //     expiresIn: '24h'
//                 // });

                
//         const user = await UserModel.findOne({ email });
//                 const token = jwt.sign({ user_id: user.id.toString() }, secretKey, {
//                     expiresIn: '24h'
//                 });


//                 res.send({ token })
//                 //console.log(data[0].dataValues.id )
//             })

//         } else {
//             res.send({ message: 'missing password' })
//         }

//     }








// })
// module.exports = router;