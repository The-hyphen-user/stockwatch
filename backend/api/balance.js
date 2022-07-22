const express = require("express");
const router = express.Router();
const user = require('../models/user')

router.get('/balance:id', async (req,res) => {
    //already authed

    const id = req.params.id;
    console.log("getting balance of: ", id);
    const User = await user.findOne({ where: { id: id}});
    if (User) {
        res.send({balance: User.balance})
    } else {
        res.status(404)
    }
})

module.exports = router;