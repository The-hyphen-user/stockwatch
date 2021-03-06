const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const user = require("../models/user");

//////////////////////////////////////////////////
//             Working state
//////////////////////////////////////////////////
const auth2 = () => {
  return async function (req, res, next) {
    try {
      const userId = req.params.user;
      console.log("going through auth", req.params.user, " params: ", userId);
      //console.log("headers: ", req.headers.token);

      const authHeader = req.headers.token;
      const bearer = "Bearer ";

      //console.log("going through auth2", authHeader);
      if (!authHeader || !authHeader.startsWith(bearer)) {
        return res.sendStatus(401);
      }

      const token = authHeader.replace(bearer, "");
      const secretKey = process.env.SECRET_JWT;

      //console.log("going through auth3:", token);
      // Verify Token
      const decoded = jwt.verify(token, secretKey);
      //console.log("going through auth3.5 user:", { id: decoded.user.id });
      const User = await user.findOne({ where: { id: decoded.user.id } });
      if (JSON.stringify(decoded.user.id) === userId) {
        console.log(
          "valid user",
          JSON.stringify(decoded.user.id),
          "===",
          userId
        );
        next();
      } else {
        console.log("invalid user", decoded.user.id, "===", userId);
      }
      //console.log("email: ", User.email);
      if (!User) {
        console.log("no user: ", user);
        return res.sendStatus(400);
      }

      //console.log('going through auth4', {User})

      // if the user has permissions
      //req.currentUser = user;
    } catch (e) {
      e.status = 401;
      next(e);
    }
  };
};

const auth = () => {
  return async function (req, res, next) {
    //need to compare req.body.id to token.user.id
    //console.log("going through auth", req.headers);
    try {
      const authHeader = req.headers.token;
      const bearer = "Bearer ";
      //console.log("going through auth", authHeader);
      if (!authHeader || !authHeader.startsWith(bearer)) {
        console.log("no token");
        return res.sendStatus(401);
      }
      const token = authHeader.replace(bearer, "");
      const secretKey = process.env.SECRET_JWT;

      const decoded = jwt.verify(token, secretKey);
      //console.log("going through auth3.5 user:", { id: decoded.user.id });
      const User = await user.findOne({ where: { id: decoded.user.id } });
      if (User) {
        console.log("valid user", decoded.user.id);
        next();
      } else {
        return res.sendStatus(401);
      }
    } catch (e) {
      e.status = 401;
      next(e);
    }

    //console.log("valid user");
    next();
  };
};

const auth3 = () => {
  return async function (req, res, next) {
    try {
      const userId = req.params.user;
      console.log("going through auth", req.params.user, " params: ", userId);
      //console.log("headers: ", req.headers.token);

      const authHeader = req.headers.token;
      const bearer = "Bearer ";

      //console.log("going through auth2", authHeader);
      if (!authHeader || !authHeader.startsWith(bearer)) {
        return res.sendStatus(401);
      }

      const token = authHeader.replace(bearer, "");
      const secretKey = process.env.SECRET_JWT;

      //console.log("going through auth3:", token);
      // Verify Token
      const decoded = jwt.verify(token, secretKey);
      //console.log("going through auth3.5 user:", { id: decoded.user.id });
      const User = await user.findOne({ where: { id: decoded.user.id } });
      if (JSON.stringify(decoded.user.id) === userId) {
        console.log(
          "valid user",
          JSON.stringify(decoded.user.id),
          "===",
          userId
        );
        next();
      } else {
        console.log("invalid user", decoded.user.id, "===", userId);
      }
      //console.log("email: ", User.email);
      if (!User) {
        console.log("no user: ", user);
        return res.sendStatus(400);
      }

      //console.log('going through auth4', {User})

      // if the user has permissions
      //req.currentUser = user;
    } catch (e) {
      e.status = 401;
      next(e);
    }
  };
};

module.exports = { auth, auth2, auth3 };
