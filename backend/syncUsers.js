const user = require('./models/user')
const stocks = require('./models/stocks')
const userStocks = require('./models/userStocks')
const { default: axios } = require('axios')
const fs = require('fs');


const userSync = () => {
    user.sync({ force: true }).then(() => {
        console.log('sync sucessful')
        const newUser = user.build({ username: 'fred', email: 'fred@email.com', balance: 10000, password: '$2a$08$GYjrOnwuWSvujRK3CGdEZeTaI.BQ5W0bLccUpywqNzFnLcxd9DsHm' });
        return newUser.save();
    }).then(() => {
        const newUser2 = user.build({ username: 'dan', email: 'dan@email.com', balance: 10000, password: '$2a$08$NwY0yjSkeuWpUKt5VWe9zeMuqShhfqwRvEYMRpHc2aBXfH11mrTqy' });
        return newUser2.save();

    }).then(() => {
        const newUser3 = user.build({ username: 'bob', email: 'bob@email.com', balance: 10000,  password: '$2a$08$GjPJddHMwNu26MnLm7zTS.59m1tVD6j9IOXKEote88RGpqYp/naTy' });
        return newUser3.save();
    })
}

// const stocksSync = () => {
//     axios.get('https://finnhub.io/api/v1/stock/symbol?exchange=US&token=cb3l2vqad3i8tak12f6g')
//         .then((data) => {
//             //const pasedData = JSON.parse(data);
//             // console.log(data)
//             fs.writeFile('stocks.json', pasedData, (err) => {
//                 if (err) {
//                     console.log('error!', err);
//                     throw err;
//                 }
//             })
//         }).then(() => {
            
//     console.log('stocksSync synced!')
//         })
//     console.log('stocksSync synced???')
// }

userSync() //for calling with node
// module.exports = { userSync, stocksSync, userStocksSync }