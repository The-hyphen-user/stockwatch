const balance = require("../api/balance");

//checks if balance is null, if null res,send to first login page
const firstLoginCheck = (req, res, next) => {
  try {
    const userId = req.currentUser.id;
    const balance = balance.findOne({ where: { userId } });
    if (balance.balance === null) {
      res.redirect("/firstLogin");
    } else {
      next();
    }
  } catch (e) {
    e.status = 401;
    next(e);
  }
};

module.exports = firstLoginCheck;
