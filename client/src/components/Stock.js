import React from "react";
import "../App.css";
import { useEffect, useState } from "react";
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

const Stock = ({ symbol, description, quantity, price, sellStock }) => {
  const [total, setTotal] = useState([]);
  const [amount, setAmount] = useState([]);
  const [sellAmount, setSellAmount] = useState([]);
  //const [description, setDescription] = useState([]);

  useEffect(() => {
    if (quantity && price) {
      setTotal((quantity * price).toFixed(2));
    }
  }, []);

  const changeSellAmount = (e) => {
    e.preventDefault();
    console.log("changeSellAmount: ", e.target.value);
    if (e.target.value <= quantity) {
      setSellAmount(e.target.value);
    } else {
      setSellAmount(quantity);
    }
  };

  const sell = () => {
    sellStock(sellAmount, symbol);
  };
  if (quantity !== 0) {
    return (
      <div className="center">
        <div className="stock">
          <h3>
            {quantity}
            {"  "}
            {symbol} {description}{" "}
          </h3>
          {price ? (
            <h3>
              {"$"}
              {price}
              {" Total: "}
              {total}
            </h3>
          ) : (
            <div></div>
          )}
        </div>
        <div className="sellable">
          {quantity ? (
            <div>
              <div className="sell-title"></div>
              <TextField
                id="outlined-basic"
                label="Sell quantity"
                value={sellAmount}
                onChange={(e) => changeSellAmount(e)}
                variant="outlined"
                type="number"
                size="medium"
                InputProps={{
                  inputProps: { min: 0, max: quantity },
                }}
              />
              <Button
                color="secondary"
                variant="contained"
                className="sell-btn"
                onClick={() => sell()}
              >
                Sell
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
};

export default Stock;


/***
 * 
              <input
                className="stock-input"
                type="number"
                min="0"
                step="1"
                max={quantity}
                value={sellAmount}
                onChange={(e) => changeSellAmount(e)}
              />
 */



