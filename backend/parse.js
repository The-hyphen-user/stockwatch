'use strict';

const fs = require('fs');
const stocks = require('./models/stocks')


// let rawdata = fs.readFileSync('stocks.json');
// let stock = JSON.parse(rawdata);
//console.log(stock[0])

// const write = async (start, end) => {
//     let rawdata = fs.readFileSync('stocks.json');
//     // let stock = JSON.parse(rawdata);
//     let data = JSON.parse(rawdata);


//     fs.appendFile(`s1.json`, '[\n', (err) => {
//         if (err) { console.error(err); return; };
//     });

//     for (let index = start; index <= end; index++) {


//         await fs.appendFile(`s1.json`, JSON.stringify(data[index], null, 4), (err) => {
//             if (err) { console.error(err); return; };
//         })
//         await fs.appendFile(`s1.json`, ',\n', (err) => {
//             if (err) { console.error(err); return; };
//         });

//     }

//     fs.appendFile(`s1.json`, '\n]', (err) => {
//         if (err) { console.error(err); return; };
//     });
// }


const sync = () => {
    let rawdata = fs.readFileSync('s2.json');
    let stock = JSON.parse(rawdata);



    stocks.sync({ force: false }).then(() => {
        stock.forEach((element) => {
            stocks.create({
                symbol: element.displaySymbol,
                description: element.description,
                type: element.type,
                currency: element.currency
            })
        })
    })
}
sync();

// write();
//write(0, 999);