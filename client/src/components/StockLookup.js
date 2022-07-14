import React, { useState } from 'react'
import Stock from './Stock'
import axios from 'axios';

const StockLookup = () => {



  const PORT = 5000
  const baseURL = 'http://localhost'
  const extensionURL = '/stocks'

  const [query, setQuery] = useState('AAPL')
  const [symbol, SetSymbol] = useState('')
  const [stock, setStock] = useState([])
  const [price, setPrice] = useState([])

  const searchForStock = async (e) => {
    
    console.log('lookup : ', query)
    e.preventDefault();
    axios.get(`${baseURL}:${PORT}${extensionURL}${query}`)
      .then((res) => {
        const newStock = {
          
          symbol: res.data.symbol,
          price :res.data.price,
          description : res.data.description
        }
        setStock(newStock)
        console.log('data: ', res.data)
        //setStock(res.data)
        // setPrice(res.price)
        console.log(res)
      })

  }





  return (
    <div>

      <input type='search' value={query}
        onChange={e => setQuery(e.target.value)}></input>
      <button onClick={searchForStock}>search</button>
      <Stock symbol={stock.symbol} quantity={stock.description} price={stock.price} />
    </div>
  )
}

export default StockLookup