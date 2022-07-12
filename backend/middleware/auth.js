
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const user = require('../models/user')

//////////////////////////////////////////////////
//            NOT WORKING
//////////////////////////////////////////////////
const auth = () => {
    return async function (req, res, next) {
        try{
            console.log('going through auth')


            const authHeader = req.headers.authorization;
            const bearer = 'Bearer ';
            
            console.log('going through auth2')
            if (!authHeader || !authHeader.startsWith(bearer)) {
                return res.sendStatus(401);
            }

            const token = authHeader.replace(bearer, '');
            const secretKey = process.env.SECRET_JWT;

            
            console.log('going through auth3:', token)
            // Verify Token
            const decoded = jwt.verify(token, secretKey);
            console.log('going through auth3.5 user:', {id: decoded.id})
            const User = await user.findOne({where:{ id: decoded.id }});
            console.log('email: ', User.email)
            if (!User) {
                console.log('no user: ', user)
                return res.sendStatus(400);
            }
            
            console.log('going through auth4', {User})


            // if the user has permissions
            //req.currentUser = user;
            next();
        } catch (e) {
            e.status = 401;
            next(e);
        }
    }
}



module.exports = auth;