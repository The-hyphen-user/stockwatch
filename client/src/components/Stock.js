import React from "react";
import "../App.css";
import { useEffect, useState } from "react";

const Stock = ({ symbol, quantity, price, sellStock }) => {
  const [total, setTotal] = useState([]);
  const [amount, setAmount] = useState([]);
  const [sellAmount, setSellAmount] = useState([]);

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

  return (
    <div className="center">
      <div className="stock">
        <h3>
          {symbol} {quantity}{" "}
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
      <div className="sell-title">sell Stock</div>
      <input
        className="stock-input"
        type="number"
        min="0"
        step="1"
        max={quantity}
        value={sellAmount}
        onChange={(e) => changeSellAmount(e)}
      />
      <button className="sell-btn" onClick={() => sell()}>
        Sell
      </button>
    </div>
  );
};

export default Stock;
