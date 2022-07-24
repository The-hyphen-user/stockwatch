const fs = require("fs");
const stocks = require("./models/stocks");

let rawdata = fs.readFileSync("stocks.json");
let stock = JSON.parse(rawdata);

const reader = fs.createReadStream;

function sync() {
  let rawdata = fs.readFileSync("stocks.json");
  let stock = JSON.parse(rawdata);

  stocks.sync({ force: true }).then(() => {
    var bulkLoad = [];
    // stocks.sync({ force: true }).then(() => {
    stock.forEach((element) => {
      bulkLoad.push({
        symbol: element.displaySymbol,
        description: element.description,
        type: element.type,
        currency: element.currency,
      });
    });
    // })
    stocks.bulkCreate(bulkLoad);
  });
}
// sync();

function main(start, end) {
  const bulkLoad = [];
  //console.log(stock.length);
  for (let index = start; index <= end; index++) {
    var newStock = stocks.build({
      symbol: stock[index].displaySymbol,
      description: stock[index].description,
      type: stock[index].type,
      currency: stock[index].currency,
    });
    newStock.save();
  }
}

main(0, 999);
