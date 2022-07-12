const express = require("express");
const dotenv = require('dotenv');
dotenv.config();
const cors = require("cors");
var corsOptions = { origin: "http://localhost:3000" };

const user = require('./models/user')
const stocks = require('./models/stocks')
const userStocks = require('./models/userStocks')
const api = require('./api')
const routes = require('./routes/user')

const app = express();


app.use(cors(corsOptions));
app.use(express.json());

app.use('/', routes)
// app.use('/api', api)




async function sync(){
user.sync({force:true}).then(() => {
    console.log('sync sucessful')
    const newUser = user.build({ username: 'fred', email: 'fred@email.com', password: 'password1' });
    return newUser.save();
}).then(() => {
    const newUser2 = user.build({ username: 'dan', email: 'dan@email.com', password: 'password1' });
    return newUser2.save();

}).then(() => {
    const newUser3 = user.build({ username: 'bob', email: 'bob@email.com', password: 'password1' });
    return newUser3.save();
})
}


const {userSync, stocksSync, userStocksSync} = require('./sync');

//userSync();
stocksSync





const port = Number(process.env.PORT || 5000);
app.listen(port, () =>
    console.log(`✨ Server running on port ${port}!`));