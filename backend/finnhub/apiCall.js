const finnhub = require('finnhub');
const dotenv = require('dotenv').config({ path: '../.env' });
const env = process.env.FINNHUB_API_key

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = env // Replace this
const finnhubClient = new finnhub.DefaultApi()

// const apiCall = function (symbol) {
//     finnhubClient.quote(symbol, (error, data, response) => {
//         console.log(data)
//         return data;

//     });
// }

module.exports = function (symbol) {
        finnhubClient.quote(symbol, (error, data, response) => {
            console.log('api call data: ', data)
        })
}


// const apiCall2 = function (symbol) {
//     finnhubClient.quote(symbol, (error, data, response) => {
//         console.log('api call data: ', data.c)
//         return data.c;
//     })
// }


// module.exports = finnhubClient.quote(symbol, (error, data, response) => {
//     console.log('finn data', data)
// });


//apiCall('AAPL')
// module.exports =  apiCall 

/*
c => Current price
d => Change
dp => Percent change
h => High price of the day
l => Low price of the day
o => Open price of the day
pc => Previous close price
 */