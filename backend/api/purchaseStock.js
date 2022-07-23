const express = require("express");
const router = express.Router();
const stockPrice = require("../models/stockPrice");
const stocks = require("../models/stocks");
const moment = require("moment");
const dotenv = require("dotenv").config();
const apiCall = require("../finnhub/apiCall");
const user = require("../models/user");
const userStocks = require("../models/userStocks");
const finnhub = require("finnhub");

const env = process.env.FINNHUB_API_key;

const api_key = finnhub.ApiClient.instance.authentications["api_key"];
api_key.apiKey = env; // Replace this
const finnhubClient = new finnhub.DefaultApi();

router.post("/purchase", async (req, res) => {
  const { id, ticker } = req.body;
  const amount = Number(req.body.amount);

  const getData = (stock) => {
    const localStoredStock = stockPrice.findAll({
      where: { symbol: stock.ticker },
    });
    if (localStoredStock) {
      //has local price?
      var localUpdateTime = moment(localStoredStock.updatedAt);
      var tenMinAgo = moment(moment.utc().subtract(30, "minutes").toDate());
      if (localUpdateTime.isBefore(tenMinAgo)) {
        //price is not recent enough?
        return getStockFromFinnhub(stock);
      } else {
        //price is recent enough
        return getStockFromLocalStorage(stock);
      }
    } else {
      //stock not in local storage
      return getStockFromFinnhub(stock);
    }
  };

  const getStockFromFinnhub = (stock) => {
    //console.log("too old data: ", stock);
    finnhubClient.quote(stock.ticker, (error, data, response) => {
      //console.log(data);
      //async stockPrice.update(//can i async here for performance?
      stockPrice.update({ price: data.c }, { where: { symbol: stock.ticker } });
      const responceStock = {
        symbol: stock.ticker,
        price: data.c,
        quantity: stock.amount,
      };
      return responceStock;
    });
  };

  const getStockFromLocalStorage = (stock) => {
    //console.log("stock is recent enough: ", stock);
    return (localStoredStock = stockPrice
      .findOne({
        where: { symbol: stock.ticker },
      })
      .then((localStoredStock) => {
        //console.log("localStoredStock: ", localStoredStock);
        const responceStock = {
          symbol: stock.ticker,
          price: localStoredStock.price,
          quantity: stock.amount,
        };
        return responceStock;
      }));
  };

  const purchaseStock = ({ User, Stock, StockPrice, amount }) => {
    //console.log("purchaseStock: ", Stock, "User: ", User, "amount: ", amount);
    //stock = {symbol, price, quantity}//useratock
    //User = {id, username, balance}
    if (User.balance >= StockPrice.price * amount) {
      User.balance -= StockPrice.price * amount;
      User.save();
      const newUserStock = {
        user_id: User.id,
        ticker: Stock.symbol,
        amount: amount,
      };
      userStocks.create(newUserStock);
      return true;
    }
  };

  const purchaseMoreStock = ({
    User,
    Stock,
    userStock,
    StockPrice,
    amount,
  }) => {
    //console.log("purchaseMoreStock: ", Stock, "User: ", User, "amount: ", amount);
    //stock = {symbol, price, quantity}//useratock
    //User = {id, username, balance}
    console.log(
      "User",
      User,
      "balance",
      User.balance,
      "price",
      StockPrice.price,
      "amount",
      amount
    );
    if (User.balance >= StockPrice.price * amount) {
      User.balance -= StockPrice.price * amount;
      User.save();
      const newAmount = userStock.amount + amount;
      //add newAmount to existing stock
      userStocks.update(
        { amount: newAmount },
        { where: { ticker: Stock.symbol, user_id: User.id } }
      );
      console.log("newAmount: ", newAmount);
      return true;
    }
  };

  // Promise.all([
  //   user.findOne({ where: { id: id } }),
  //   userStocks.findAll({ where: { ticker: ticker, id:id } }),
  //   stocks.findOne({ where: { ticker: ticker } }),
  // ]).then(([User, userStock, stock]) => {
  //   if (User && stock && !userStock) {
  //     purchaseStock({ User, stock, amount });
  //   } else if (User && stock && userStock) {
  //     purchaseMoreStock({ User, stock, userStock, amount });
  //   }
  // }).then((success) => {
  //   if (success) {
  //     res.send("success");
  //   } else {
  //     res.send("fail");
  //   }
  // })

  async function getInfo({ id, ticker }) {
    //console.log('REEEEEEEEEEEESSSSSSSSSSSS0', res._header)
    const User = await user.findOne({ where: { id: id } });
    //console.log('User', User)
    //console.log('REEEEEEEEEEEESSSSSSSSSSSS1', res._header)
    const Stock = await stocks.findOne({ where: { symbol: ticker } }); //, raw: true
    //console.log('Stock', Stock)
    //console.log('REEEEEEEEEEEESSSSSSSSSSSS2', res._header)
    const userStock = await userStocks.findOne({
      where: { ticker: ticker, user_id: id },
    });
    //console.log('userStock', userStock)
    //console.log('REEEEEEEEEEEESSSSSSSSSSSS3', res._header)
    const StockPrice = await stockPrice.findOne({ where: { symbol: ticker } });
    //console.log('StockPrice', StockPrice)
    //console.log('FUCK you headers', User, 'STOOOOOCK', Stock, 'USERSTOOOOOK', userStock, 'STOCKPRIIIIIIICE', StockPrice);

    //console.log('REEEEEEEEEEEESSSSSSSSSSSS4', res._header)
    if (User && Stock && StockPrice && !userStock) {
      console.log("purchaseStock");
      return purchaseStock({ User, Stock, StockPrice, amount });
    } else if (User && Stock && StockPrice && userStock) {
      console.log("purchaseMoreStock", User, User.balance);
      return purchaseMoreStock({ User, Stock, userStock, StockPrice, amount });
    }
  }

  const value = await getInfo({ id, ticker, amount });
  if (value) {
    //res.setstatus(200).send("success");
    console.log("RES final", res._header);
    res.send("success");
    console.log("AFTER REEEEEEEEEEEESSSSSSSSSSSS2");
  } else {
    console.log("FAIL final", res._header);
    res.send("fail");
  }
  //console.log('get info: ',await getInfo({ id, ticker, amount }));
});

module.exports = router;

/****
 * 
  Promise.all([
    user.findOne({ where: { id: id } }),
    userStocks.findAll({ where: { ticker: ticker, id:id } }),
    stocks.findOne({ where: { ticker: ticker } }),
  ]).then(([User, userStock, stock]) => {
    if (User && stock && !userStock) {
      purchaseStock({ User, stock, amount });
    } else if (User && stock && userStock) {
      purchaseMoreStock({ User, stock, userStock, amount });
    }
  }).then((success) => {
    if (success) {
      res.send("success");
    } else {
      res.send("fail");
    }
  })

})
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
  // const User = await user.findOne({ where: { id: id } })
  // const Stock = await userStocks.findOne({ where: { user_id: id } }); //, raw: true
  if (Stock && User) {
    // getData(Stock).then((stock) => {
    //   purchaseStock(stock, User);
    // })
    console.log("stock: ", Stock, "User: ", User);
    // const stock = await getData(Stock);
    if (stock) {
      console.log("stock: ", stock, amount);
    // const a = await purchaseStock(stock, User, amount).then((a) => {
      res.json(a);
    })
    console.log("a.amount: ", a);
    }
  } else if (!Stock && User) {
    console.log("no stock");
  }
    console.log("no stock and user");
  }).then(() => {
    res.json("success");
  })
  .catch((err) => {
    console.log("err: ", err);
    res.json("error");
  })
}); 

 */
