import React, { useEffect, useState } from "react";
import { useJwt, isExpired, decodeToken } from "react-jwt";
import jwt_decode from "jwt-decode";
import axios from "axios";
import Stock from "./Stock";
import StockLookup from "./StockLookup";
import Balance from "./Balance";

const User = () => {
  // const [user, setUser] = useState([])
  // localStorage.getItem()
  // useEffect(() => {

  //   return () => {
  //   }
  // }, [])

  const [bearerToken, setBearerToken] = useState(["Bearer missing-token-info"]);
  const [token, setToken] = useState([]);
  const [username, SetUsername] = useState("");
  const [user, SetUser] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [balance, setBalance] = useState([]);
  const [lookedUpStocks, setLookedUpStocks] = useState([]);
  const [query, setQuery] = useState("AAPL");

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
  }, []);

  const purcaseStock = function (stock) {
    if (stock.symbol === "stock not found") {
    } else {
      console.log("purchasing ", stock.amount, " stock: ", stock);
      // const bearerToken = JSON.parse(localStorage.getItem('token'))
      const bearerToken = JSON.parse(localStorage.getItem("token"));
      const id = jwt_decode(bearerToken.replace("Bearer ", "")).user.id;
      console.log("to be send for purchase: ", id, stock, stock.amount);
      axios
        .post(`${baseURL}:${PORT}/purchase`, {
          ticker: stock,
          amount: stock.amount,
          id: id,
          headers: {
            token: bearerToken,
          },
        })
        .then((res) => {
          console.log("purchased: ", res.data);
          setStocks(res.data);
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
      })
      .catch((err) => {
        console.log("error: ", err);
        if (err.response.status === 404) {
          setLookedUpStocks({ symbol: "Stock not found" });
        }
      });
  };

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <StockLookup purchase={purcaseStock} />
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      ></input>
      <button onClick={searchForStock}>search</button>
      <br />
      <Stock symbol={lookedUpStocks.symbol} price={lookedUpStocks.price} />

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
                      />
                    ))}
                  </div>
                ) : (
                  <div>Loading...</div>
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
