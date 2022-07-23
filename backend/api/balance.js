const express = require("express");
const router = express.Router();
const user = require('../models/user')

router.get('/balance:id', async (req,res) => {
    //already authed

    const id = req.params.id;
    console.log("getting balance of: ", id);
    const User = await user.findOne({ where: { id: id}});
    if (User) {
        console.log('sending balance from balance.js')
        res.send({balance: User.balance})
    } else {
        console.log('404 from balance.js')
        res.status(404)
    }
})

module.exports = router;