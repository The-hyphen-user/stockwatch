import React, { useEffect, useState } from 'react'
import { useJwt, isExpired, decodeToken } from "react-jwt";
import jwt_decode from "jwt-decode";
import axios from 'axios';
import Stock from './Stock'
import StockLookup from './StockLookup';


const User = () => {
  // const [user, setUser] = useState([])
  // localStorage.getItem()
  // useEffect(() => {


  //   return () => {
  //   }
  // }, [])



  const [bearerToken, setBearerToken] = useState(['Bearer missing-token-info']);
  const [token, setToken] = useState([])
  const [username, SetUsername] = useState('')
  const [user, SetUser] = useState([])
  const [stocks, setStocks] = useState([
    { user_id: 2, ticker: 'AAPL', amount: 999, createdAt: '2022-07-12T20:15:35.000Z', updatedAt: '2022-07-12T20:15:35.000Z' },
    { user_id: 2, ticker: 'GOOG', amount: 999, createdAt: '2022-07-12T20:15:35.000Z', updatedAt: '2022-07-12T20:15:35.000Z' }
  ])
  const [fakeStocks, setFakeStocks] = useState([
    { user_id: 2, ticker: 'AAPL', amount: 999, createdAt: '2022-07-12T20:15:35.000Z', updatedAt: '2022-07-12T20:15:35.000Z' },
    { user_id: 2, ticker: 'GOOG', amount: 999, createdAt: '2022-07-12T20:15:35.000Z', updatedAt: '2022-07-12T20:15:35.000Z' }
  ])


  const PORT = 5000
  const baseURL = 'http://localhost'
  const extensionURL = '/user'

  // useEffect(() => {
  //   const getToken = async () => {
  //     const bearerToken = JSON.parse(localStorage.getItem('token'));
  //     setToken(bearerToken.replace('Bearer ', ''))
  //     SetUser(jwt_decode(bearerToken.replace('Bearer ', '')).user.id)
  //     //return jwt_decode(bearerToken.replace('Bearer ', '')).user.id
  //     return jwt_decode(bearerToken)
  //   }
  //   const getId = async (bearerToken) => {
  //   return jwt_decode(bearerToken.replace('Bearer ', '')).user.id
  //   }
  //   const getStocks = async () => { 
  //   const bearerToken = await getToken()
  //   const id = await getId(bearerToken)
  //   console.log('id: ', id, 'token: ', bearerToken)
  //   axios.get(`${baseURL}:${PORT}${extensionURL}${id}`,{
  //     headers: {
  //       'token': bearerToken
  //     }
  //   })
  //   .then((res) => {
  //     setStocks(res.data)
  //        console.log('data: ', res.data)
  //   })
  //   }
  //   getStocks()
  // }, [])

  useEffect(() => {
    const getToken = function () {
      const bearerToken = JSON.parse(localStorage.getItem('token'));
      console.log('bearerToken: ', bearerToken)
      const id = jwt_decode(bearerToken.replace('Bearer ', '')).user.id;
      console.log('id: ', id)
      axios.get(`${baseURL}:${PORT}${extensionURL}${id}`, {
        headers: {
          'token': bearerToken
        }
      }).then((res) => {
            setStocks(res.data)
               console.log('data: ', res.data)
          })

    }



    getToken()
  }, [])

  /**
   
  .then((id) => {
        const res =  fetch(`${baseURL}:${PORT}${extensionURL}${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setStocks(res.data)
      })
   */

  const getToken2 = async () => {
    const bearerToken = JSON.parse(localStorage.getItem('token'));
    setToken(bearerToken.replace('Bearer ', ''))
    SetUser(jwt_decode(bearerToken.replace('Bearer ', '')).user)
    return jwt_decode(bearerToken.replace('Bearer ', '')).user.id
  }
  const getStocks2 = async () => {
    const id = await getToken2()
    console.log('id: ', id)
    axios.get(`${baseURL}:${PORT}${extensionURL}${id}`, {
      headers: {
        'token': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJ1c2VybmFtZSI6ImRhbiIsImVtYWlsIjoiZGFuQGVtYWlsLmNvbSJ9LCJpYXQiOjE2NTc3NTQxMTQsImV4cCI6MTY1Nzg0MDUxNH0.ATwTT-xD0tvnIgH-qLYFQPFU2DWfRCYkC9KL0OVcBw8"
      }
    })
      .then((res) => {
        setStocks(res.data)
        console.log('data: ', res.data)
      })
  }

  const fetchData = async () => {
    console.log('loading stocks')
    getStocks2()
  }


  return (
    <div>

      <br />
      <br />
      <br />
      <br />
      <StockLookup/>
      <b>{bearerToken ?
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
                <Stock key={index}
                symbol={stock.ticker}
                  quantity={stock.amount}

                />
              ))}
              {token}
              <br />
              {user.id}{' '}{user.username}
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



{stocks.map((stock, index) => (
                <div key={index}> {stock.ticker}</div>
              ))}





{stocks.map((stock) => 
              <li>
              {stock.ticker}
              </li>
            )}






            */



