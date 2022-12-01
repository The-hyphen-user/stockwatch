import React, { useEffect, useState } from "react";
import { useJwt, isExpired, decodeToken } from "react-jwt";
import jwt_decode from "jwt-decode";
import axios from "axios";
import Stock from "./Stock";
import StockLookup from "./StockLookup";
import Balance from "./Balance";
import "../App.css";
import { useNavigate } from "react-router-dom";
import SearchResults from "./SearchResults";
//import Box from "@material-ui/core/Box";
import {
  Grid,
  Box,
  Paper,
  Table,
  Button,
  TextField,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  makeStyles,
} from "@material-ui/core";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { purple, green } from "@material-ui/core/colors";

//Consolas, 'Courier New', monospace
//Consolas, 'Courier New', monospace
const User = () => {
  // const theme = createTheme({
  //   palette: {
  //     primary: {
  //       main: purple[500],
  //     },
  //     secondary: {
  //       main: green[500],
  //     },
  //   },
  // })

  const [bearerToken, setBearerToken] = useState("");
  const [token, setToken] = useState([]);
  const [username, SetUsername] = useState("");
  const [user, SetUser] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [balance, setBalance] = useState([]);
  const [lookedUpStockBySymbol, setLookedUpStockBySymbol] = useState([]);
  const [lookedUpStocksByString, setLookedUpStocksByString] = useState([]);
  const [showSingleStock, setShowSingleStock] = useState(true);
  const [query, setQuery] = useState("apple");
  const [maximumPurchasable, setMaximumPurchasable] = useState(999999);
  const [purchaseAmount, setPurchaseAmount] = useState(0);
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [wealth, setWealth] = useState(0);
  const [queryAmount, setQueryAmount] = useState(40);

  let navigate = useNavigate();

  const [fakeStocks, setFakeStocks] = useState([
    {
      id: 2,
      symbol: "AAPL",
      amount: 999,
      createdAt: "2022-07-12T20:15:35.000Z",
      updatedAt: "2022-07-12T20:15:35.000Z",
    },
    {
      id: 2,
      symbol: "GOOG",
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
      if (bearerToken) {
        setBearerToken(bearerToken);
        const id = jwt_decode(bearerToken.replace("Bearer ", "")).user.id;
        console.log("id: ", id);
        axios
          .get(`${baseURL}:${PORT}/user${id}`, {
            headers: {
              token: bearerToken,
            },
          })
          .then((res) => {
            setStocks(res.data.stocks);
            console.log("useEffect data: ", res.data.stocks);
            setBalance(res.data.balance);
            setPrivacy(res.data.privacy);
            setWealth(res.data.wealth);
            console.log("useEffect balance: ", res.data.balance);
            console.log("useEffect privacy: ", res.data.privacy);
          })
          .then(() => {
            //getBalance();
          });
      }
    };

    getUserStocks();
    setRefresh(false);
  }, [refresh]);

  const purcaseStock = function () {
    if (
      lookedUpStockBySymbol.symbol === "Stock not found" ||
      lookedUpStockBySymbol.symbol === "" ||
      lookedUpStockBySymbol.symbol === undefined ||
      lookedUpStockBySymbol.symbol === []
    ) {
      console.log("Stock not found", lookedUpStockBySymbol);
    } else {
      console.log("purchasing ", purchaseAmount, " of ", lookedUpStockBySymbol);
      //const bearerToken = JSON.parse(localStorage.getItem('token'))
      const bearerToken = JSON.parse(localStorage.getItem("token"));
      const id = jwt_decode(bearerToken.replace("Bearer ", "")).user.id;
      console.log(
        "to be send for purchase: ",
        id,
        lookedUpStockBySymbol,
        purchaseAmount
      );
      axios
        .post(
          `${baseURL}:${PORT}/purchase`,
          {
            symbol: lookedUpStockBySymbol.symbol,
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

  const searchForStockBySymbol = async (e) => {
    if (e) {
      e.preventDefault();
    }
    console.log("searching for stock: ", query);
    axios
      .get(`${baseURL}:${PORT}${extensionURL4}${query}`)
      .then((res) => {
        console.log("searching for stock!!!: ", res.data);
        setLookedUpStockBySymbol(res.data);
        calculateMaximumPurchasable(res.data.price, balance);
        return res.data.price;
      })
      .then((price) => {
        calculatePurchaseAmount(price);
        console.log("price: ", price);
        setShowSingleStock(true);
      })
      .catch((err) => {
        console.log("error: ", err);
        if (err.response.status === 404) {
          setLookedUpStockBySymbol({ symbol: "Stock not found" });
        }
      });
  };

  const searchForStockByString = async (e) => {
    e.preventDefault();
    console.log("searching for stock: ", query);
    const trimmedQuery = query.trim();
    if (trimmedQuery.length > 0) {
      axios
        .get(`${baseURL}:${PORT}/search${trimmedQuery}/${queryAmount}`)
        .then((res) => {
          console.log("searching for stock!!!: ", res.data);
          setLookedUpStocksByString(res.data);
          setShowSingleStock(false);
        });
    } else {
      console.log("missing query");
    }
  };

  const calculateMaximumPurchasable = (price, balance) => {
    console.log("calculating maximum purchasable: ", price, balance);
    const max = Math.floor(parseInt(balance) / parseInt(price));
    console.log("max: ", max);
    setMaximumPurchasable(max);
    if (purchaseAmount > max) {
      setPurchaseAmount(max);
      setPurchasePrice(max * lookedUpStockBySymbol.price);
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
        setPurchasePrice(e.target.value * lookedUpStockBySymbol.price);
      } else {
        setPurchaseAmount(maximumPurchasable);
        setPurchasePrice(maximumPurchasable * lookedUpStockBySymbol.price);
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
          symbol: symbol,
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

  const changePrivacy = function (e) {
    setPrivacy(e);
    console.log("setting privacy: ", e);
    const bearerToken = JSON.parse(localStorage.getItem("token"));
    const id = jwt_decode(bearerToken.replace("Bearer ", "")).user.id;
    axios
      .post(
        `${baseURL}:${PORT}/privacy${id}`,
        {
          privacy: e,
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

  const selectedStock = (symbol) => {
    console.log("selected stock: ", symbol);
    setQuery(symbol);
    console.log("query: ", query);
    setShowSingleStock(true);
    searchForStockBySymbol();
    axios
      .get(`${baseURL}:${PORT}${extensionURL4}${symbol}`)
      .then((res) => {
        console.log("searching for stock!!!: ", res.data);
        setLookedUpStockBySymbol(res.data);
        calculateMaximumPurchasable(res.data.price, balance);
        return res.data.price;
      })
      .then((price) => {
        calculatePurchaseAmount(price);
        console.log("price: ", price);
        setShowSingleStock(true);
      })
      .catch((err) => {
        console.log("error: ", err);
        if (err.response.status === 404) {
          setLookedUpStockBySymbol({ symbol: "Stock not found" });
        }
      });
  };

  const changeSellAmount = (symbol, amount) => {};

  if (bearerToken) {
    return (
      <div>
        <br />
        <br />
        <br />
        <div className="privacy-container">
          <div className="privacy">
            <label>Make account public: </label>
            <input
              type="checkbox"
              checked={privacy}
              onChange={(e) => changePrivacy(e.target.checked)}
            />
          </div>
        </div>

        <br />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        ></input>
        <Button
          color="success"
          variant="contained"
          onClick={searchForStockByString}
        >
          search
        </Button>
        <button onClick={searchForStockBySymbol}>search Symbol</button>
        <br />
        <Stock
          symbol={lookedUpStockBySymbol.symbol}
          price={lookedUpStockBySymbol.price}
          description={lookedUpStockBySymbol.description}
        />
        <div>
          {lookedUpStockBySymbol && showSingleStock ? (
            <div>
              <Box
                sx={{
                  mr: 50,
                  ml: 50,
                  p: 5,
                  alignContent: "stretch",
                }}
              >
                <TextField
                  variant="outlined"
                  label="Purchase Amount"
                  margin="auto"
                  type="number"
                  color="primary"
                  min="0"
                  step="1"
                  value={purchaseAmount}
                  onChange={(e) => calculatePurchaseAmount(e)}
                />{" "}
                <Button
                  margin="auto"
                  color="success"
                  variant="contained"
                  onClick={purcaseStock}
                >
                  Purchase
                </Button>
                <Button variant="contained" color="success">
                  Success
                </Button>
              </Box>
              <Button color="secondary">Secondary</Button>
              <Button variant="contained" color="success">
                Success
              </Button>
              <Button variant="outlined" color="error">
                Error
              </Button>
              {purchasePrice ? (
                <div>
                  {" "}
                  <p>
                    {" "}
                    You will purchase {purchaseAmount} stocks for{" "}
                    {(purchasePrice + 1).toLocaleString()}{" "}
                    {" includes a $1 purchase fee."}{" "}
                  </p>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          ) : (
            <div></div>
          )}
          {lookedUpStocksByString && !showSingleStock ? (
            <div>
              <SearchResults
                results={lookedUpStocksByString}
                selectedStock={selectedStock}
              />
            </div>
          ) : null}
        </div>

        <div>
          {bearerToken ? (
            <div className="border-orange">
              welcome {username} lets see how your stocks are doing today
              <br />
              <Balance balance={balance} />
              <br />
              {"Wealth: " + wealth.toLocaleString()}
              <br />
              <br />
              
              <br />
              <br />
              <div className="stock-container-green">
                <div className="stock-container-green">
                  {stocks ? (
                    <div className="border-red">
                      <Grid
                        container
                        spacing={2}
                        alignItems="center"
                        justifyContent="center"
                        centered
                      >
                        {stocks.map((stock, index) => (
                          <Grid item sm={12} key={index}>
                            <Paper elevation={8}>
                              <Stock
                                key={index}
                                symbol={stock.symbol}
                                quantity={stock.quantity}
                                price={stock.price}
                                description={stock.description}
                                sellStock={sellStock}
                              />
                            </Paper>
                          </Grid>
                        ))}
                      </Grid>
                    </div>
                  ) : (
                    <div>No Stocks</div>
                  )}
                </div>
              </div>
              {token}
              <br />
              {user.id} {user.username}
            </div>
          ) : (
            "error loading"
          )}
        </div>
      </div>
    );
  } else {
    return (
      // setTimeout(() => {
      navigate("/login", { replace: true })
      // }, 1500)
    );
  }
};

export default User;

/**
 * 
 * {lookedUpStocksByString && !showSingleStock ? (
                <div></div>
              ) : (
                <div></div>
              )}
 */

/***
               * 
               * <div>
                  {stocks ? (
                    <div>
                      {stocks.map((stock, index) => (
                        <Stock
                          key={index}
                          symbol={stock.symbol}
                          quantity={stock.quantity}
                          price={stock.price}
                          description={stock.description}
                          sellStock={sellStock}
                        />
                      ))}
                    </div>
                  ) : (
                    <div>No Stocks</div>
                  )}
                </div>
               */


/***
 * 
 * <Box
                sx={{
                  maxWidth: "80%",
                  margin: "auto",
                  backgroundColor: "gray",
                }}
              >
                <TableContainer
                  component={Paper}
                  style={{
                    backgroundColor: "rgb(172, 163, 164)",
                    color: "white",
                  }}
                >
                  <Table
                    aria-label="simple table"
                    sx={{
                      width: 300,
                      maxHeight: 800,
                      maxWidth: 750,
                      backgroundColor: "primary.dark",
                      border: "1px solid black",
                      borderRadius: "10px",
                      borderColor: "primary.main",
                      pr: 3,
                      mr: 3,
                    }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Symbol</TableCell>
                        <TableCell align="center">description</TableCell>
                        <TableCell align="center">Price</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="center">Total</TableCell>
                        <TableCell align="center">Sell Stock</TableCell>
                        <TableCell align="center">Sell Stock2</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {stocks.map((row) => (
                        <TableRow key={row.symbol}>
                          <TableCell align="center">{row.symbol}</TableCell>
                          <TableCell align="center">
                            {row.description}
                          </TableCell>
                          <TableCell align="center">{row.price}</TableCell>
                          <TableCell align="center">{row.quantity}</TableCell>
                          <TableCell align="center">
                            {row.quantity * row.price}
                          </TableCell>
                          <TableCell align="center">
                            <TextField
                              id="outlined-basic"
                              label="Sell #"
                              variant="outlined"
                              type="number"
                              size="medium"
                              InputProps={{
                                inputProps: { min: 0, max: row.quantity },
                              }}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <Button
                              color="secondary"
                              variant="contained"
                              onClick={() => sellStock(row.symbol, row.amount)}
                            >
                              Sell
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
 */