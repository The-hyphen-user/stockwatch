import React, { useEffect, useState } from "react";
import { useJwt, isExpired, decodeToken } from "react-jwt";
import jwt_decode from "jwt-decode";
import axios from "axios";
import Stock from "./Stock";
import StockLookup from "./StockLookup";
import Balance from "./Balance";

const User = () => {
  const [bearerToken, setBearerToken] = useState(["Bearer missing-token-info"]);
  const [token, setToken] = useState([]);
  const [username, SetUsername] = useState("");
  const [user, SetUser] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [balance, setBalance] = useState([]);
  const [lookedUpStocks, setLookedUpStocks] = useState([]);
  const [query, setQuery] = useState("AAPL");
  const [maximumPurchasable, setMaximumPurchasable] = useState(999999);
  const [purchaseAmount, setPurchaseAmount] = useState(0);
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [refresh, setRefresh] = useState(false);

  const [fakeStocks, setFakeStocks] = useState([
    {
      user_id: 2,
      ticker: "AAPL",
      amount: 999,
      createdAt: "2022-07-12T20:15:35.000Z",
      updatedAt: "2022-07-12T20:15:35.000Z",
    },
    {
      user_id: 2,
      ticker: "GOOG",
      amount: 999,
      createdAt: "2022-07-12T20:15:35.000Z",
      updatedAt: "2022-07-12T20:15:35.000Z",
    },
  ]);

  const PORT = 5000;
  const baseURL = "http://localhost";
  const extensionURL = "/user";
  const extensionURL2 = "/stocks";
  const extensionURL3 = "/balance";
  const extensionURL4 = "/stocks";
  const extensionURL5 = "/stocks/buy";
  const extensionURL6 = "/stocks/sell";

  useEffect(() => {
    const getUserStocks = function () {
      const bearerToken = JSON.parse(localStorage.getItem("token"));
      console.log("stocks bearerToken: ", bearerToken);
      const id = jwt_decode(bearerToken.replace("Bearer ", "")).user.id;
      console.log("id: ", id);
      axios
        .get(`${baseURL}:${PORT}${extensionURL}${id}`, {
          headers: {
            token: bearerToken,
          },
        })
        .then((res) => {
          setStocks(res.data.stocks);
          console.log("useEffect data: ", res.data.stocks);
          setBalance(res.data.balance);
        })
        .then(() => {
          //getBalance();
        });
    };
    const getBalance = function () {
      const balance = "/balance";

      console.log("checking bearer that balance");
      const bearerToken = JSON.parse(localStorage.getItem("token"));
      console.log("balance bearerToken: ", bearerToken);
      const id = jwt_decode(bearerToken.replace("Bearer ", "")).user.id;
      console.log("headers token bearerToken: ", bearerToken, "id: ", id);
      axios
        .get(`${baseURL}:${PORT}${extensionURL3}${id}`, {
          headers: {
            token: bearerToken,
          },
        })
        .then((res) => {
          console.log("loading that balance: ", res.data.balance);
          setBalance(res.data.balance.toLocaleString());
          return res.data.balance;
        });
    };

    getUserStocks();
    setRefresh(false);
  }, [refresh]);

  const purcaseStock = function () {
    if (
      lookedUpStocks.symbol === "Stock not found" ||
      lookedUpStocks.symbol === "" ||
      lookedUpStocks.symbol === undefined ||
      lookedUpStocks.symbol === []
    ) {
      console.log("Stock not found", lookedUpStocks);
    } else {
      console.log("purchasing ", purchaseAmount, " of ", lookedUpStocks);
      //const bearerToken = JSON.parse(localStorage.getItem('token'))
      const bearerToken = JSON.parse(localStorage.getItem("token"));
      const id = jwt_decode(bearerToken.replace("Bearer ", "")).user.id;
      console.log(
        "to be send for purchase: ",
        id,
        lookedUpStocks,
        purchaseAmount
      );
      axios
        .post(
          `${baseURL}:${PORT}/purchase`,
          {
            ticker: lookedUpStocks.symbol,
            amount: purchaseAmount,
            id: id,
          },
          {
            headers: {
              token: bearerToken,
            },
          }
        )
        .then(function (response) {
          console.log("res: ", response);
          setRefresh(true);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const searchForStock = async (e) => {
    e.preventDefault();
    console.log("searching for stock: ", query);
    axios
      .get(`${baseURL}:${PORT}${extensionURL4}${query}`)
      .then((res) => {
        console.log("searching for stock: ", res.data);
        setLookedUpStocks(res.data);
        calculateMaximumPurchasable(res.data.price, balance);
        return res.data.price;
      })
      .then((price) => {
        calculatePurchaseAmount(price);
        console.log("price: ", price);
      })
      .catch((err) => {
        console.log("error: ", err);
        if (err.response.status === 404) {
          setLookedUpStocks({ symbol: "Stock not found" });
        }
      });
  };

  const calculateMaximumPurchasable = (price, balance) => {
    console.log("calculating maximum purchasable: ", price, balance);
    const max = Math.floor(parseInt(balance) / parseInt(price));
    console.log("max: ", max);
    setMaximumPurchasable(max);
    if (purchaseAmount > max) {
      setPurchaseAmount(max);
      setPurchasePrice(max * lookedUpStocks.price);
    } else {
    }
  };

  //check that e is less then maximumPurchasable before setting state
  const calculatePurchaseAmount = (e) => {
    if (typeof e === "number") {
      console.log("not a num");
      setPurchasePrice(e * purchaseAmount);
    } else {
      e.preventDefault();
      console.log("calculating purchase amount: ", e.target.value);
      if (e.target.value <= maximumPurchasable) {
        setPurchaseAmount(e.target.value);
        setPurchasePrice(e.target.value * lookedUpStocks.price);
      } else {
        setPurchaseAmount(maximumPurchasable);
        setPurchasePrice(maximumPurchasable * lookedUpStocks.price);
      }
    }
  };

  const sellStock = function (amount, symbol) {
    console.log("selling ", amount, " of ", symbol);
    //triggered from stock component
    const bearerToken = JSON.parse(localStorage.getItem("token"));
    const id = jwt_decode(bearerToken.replace("Bearer ", "")).user.id;
    console.log("to be send for purchase: ", id, symbol, amount);
    axios
      .post(
        `${baseURL}:${PORT}/sell`,
        {
          ticker: symbol,
          amount: amount,
          id: id,
        },
        {
          headers: {
            token: bearerToken,
          },
        }
      )
      .then(function (response) {
        console.log("res: ", response);
        setRefresh(true);
      });
  };

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      ></input>
      <button onClick={searchForStock}>search</button>
      <br />
      <Stock symbol={lookedUpStocks.symbol} price={lookedUpStocks.price} />
      <div>
        {lookedUpStocks ? (
          <div>
            <input
              type="number"
              min="0"
              step="1"
              value={purchaseAmount}
              onChange={(e) => calculatePurchaseAmount(e)}
            />{" "}
            <button onClick={purcaseStock}>Purchase</button>
            {purchasePrice ? (
              <div>
                <p>
                  You will purchase {purchaseAmount} stocks for{" "}
                  {purchasePrice.toLocaleString()}
                </p>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        ) : (
          <div></div>
        )}
      </div>

      <div>
        {bearerToken ? (
          <div>
            welcome {username} lets see how your stocks are doing today
            <br />
            <Balance balance={balance} />
            <br />
            <>
              <div>
                {stocks ? (
                  <div>
                    {stocks.map((stock, index) => (
                      <Stock
                        key={index}
                        symbol={stock.symbol}
                        quantity={stock.quantity}
                        price={stock.price}
                        sellStock={sellStock}
                      />
                    ))}
                  </div>
                ) : (
                  <div>No Stocks</div>
                )}
              </div>
              {token}
              <br />
              {user.id} {user.username}
            </>
          </div>
        ) : (
          "error loading"
        )}
      </div>
    </div>
  );
};

export default User;
