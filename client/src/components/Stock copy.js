import React from "react";
import "../App.css";
import { useEffect, useState } from "react";

const Stock = ({ symbol, quantity, price }) => {
  const [total, setTotal] = useState([]);

  useEffect(() => {
    if (quantity && price) {
      setTotal((quantity * price).toFixed(2));
    }
  }, []);


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
          </h3>
        ) : (
          <div></div>
        )},
        {total ? (
          <h3>
            {" $ Total: "}
            {total}
          </h3>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Stock;
