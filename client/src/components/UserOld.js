import React, { useEffect, useState } from 'react'
import { useJwt, isExpired, decodeToken } from "react-jwt";
import jwt_decode from "jwt-decode";
import axios from 'axios';
import Stock from './Stock'


const User = () => {
  // const [user, setUser] = useState([])
  // localStorage.getItem()
  // useEffect(() => {


  //   return () => {
  //   }
  // }, [])



  const [items, setItems] = useState(['items']);
  const [token, setToken] = useState([])
  const [username, SetUsername] = useState('')
  const [user, SetUser] = useState([])
  const [stocks, setStocks] = useState([])
  const [fakeStocks, setFakeStocks] = useState([
    { user_id: 2, ticker: 'AAPL', amount: 10, createdAt: '2022-07-12T20:15:35.000Z', updatedAt: '2022-07-12T20:15:35.000Z' },
    { user_id: 2, ticker: 'GOOG', amount: 1, createdAt: '2022-07-12T20:15:35.000Z', updatedAt: '2022-07-12T20:15:35.000Z' }
  ])


  const PORT = 5000
  const baseURL = 'http://localhost'
  const extensionURL = '/user'

  useEffect(() => {
    const getToken = async() => {
      const items = await JSON.parse(localStorage.getItem('token'));
      //.then(() => {})
    if (items) {
      setToken(items.replace('Bearer ', ''))
      var bearerToken = items.replace('Bearer ', '')
       console.log('the token: ', token)
      var decoded = jwt_decode(bearerToken)
       console.log('user: ', decoded.user)
      SetUser(decoded.user)
      //getStocks()
    } else {
      console.log('no items')
    }
    }
    
    const getData = async () => {
      const dataFromServer = await fetchData()
      setStocks(dataFromServer)
    }
    getToken().then(() => {
      getData();
    })

  }, []);


  // useEffect(() => {

  //   const getData = async () => {
  //     const dataFromServer = await fetchData()
  //     setStocks(dataFromServer)
  //   }
  //   getData();

  // }, []);


  const fetchData = async () => {
    const id = user.id
    //const id = 2
    console.log('token: ', token)
    //axios.get(`${baseURL}:${PORT}${extensionURL}:${id}`)
    const res = await fetch(`${baseURL}:${PORT}${extensionURL}${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const data = await res.json()
    console.log('DATA: ', data)
    return data;
  };





  // const getStocks = async () => {
  //   const id = user.id
  //   axios.get(`${baseURL}:${PORT}${extensionURL}${id}`)
  //     .then((res) => {
  //       console.log('res: ', res)
  //       console.log('data: ', res.data)
  //       const arr = res.data
  //       setStocks(arr)
  //       if (false) {
  //         const blah = arr.forEach(element => {
  //           const string = JSON.stringify(element)

  //           setStocks(stocks => [...stocks, string])
  //           //console.log(JSON.stringify(element))
  //           console.log('stocks', stocks)
  //           console.log('string', string)
  //         })
  //       }
  //       else {
  //         console.log('already cooked stocks:', stocks)
  //       }
  //       //setStocks(res.data)
  //     });
  // };



  // const listItems = numbers.map((number) =>
  //   <li key={number.toString()}>
  //     {number}
  //   </li>
  // );



  return (
    <div>

      <br />
      <br />
      <br />
      <br />
      <b>{items ?
        <div>
          welcome{' '}
          {username}
          {' '} lets see how your stocks are doing today

          <br />
          <br />
          <ul>
            <button onClick={fetchData}>load stocks</button>
            <>

              {stocks.map((stock, index) => (
                <div key={index}> {stock.ticker}</div>
              ))}
              {stocks.map((stock, index) => (
                <Stock key={index}
                ticker={stock.ticker}
                quantity={stock.amount}
                
                />
              ))}
            </>


          </ul>

        </div>








        : 'error loading'}</b>





    </div>
  )
}

export default User



/*

{stocks.map((stock) => (
                // Setting "index" as key because name and age can be repeated, It will be better if you assign uniqe id as key
                <li >
                  <span>ticker: {stock.ticker}</span>{" "}
                  <span>amount: {stock.amount}</span>
                </li>
              ))}


          <ul>
            {fakeStocks.map((post) =>
              <li key={post.user_id}>
                {post.ticker}
              </li>
            )}
          </ul>









{stocks.map((stock) => 
              <li>
              {stock.ticker}
              </li>
            )}






            */



