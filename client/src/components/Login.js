import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const Login = () => {//{signupmail, signupPassword}


  const [email, setEmail] = useState('dan@email.com')
  const [password, setPassword] = useState('password1')
  const [items, setItems] = useState([]);
  let navigate = useNavigate();



  useEffect(() => {
    const getToken = async () => {
      // const bearerToken = JSON.parse(localStorage.getItem('token'));
      // setToken(bearerToken.replace('Bearer ', ''))
      // SetUser(jwt_decode(bearerToken.replace('Bearer ', '')).user)
      // return jwt_decode(bearerToken.replace('Bearer ', '')).user.id
    }
    const getStocks = async () => {
      // const id = await getToken()
      // console.log('id: ', id)
      // axios.get(`${baseURL}:${PORT}${extensionURL}${id}`)
      // .then((res) => {
      //   setStocks(res.data)
      //      console.log('data: ', res.data)
      // })


    }


    getStocks()
  }, [])


  // if ({signupmail} && {signupPassword}){
  //   setEmail({signupmail})
  //   setPassword({signupPassword})
  // }

  // useEffect(() => {
  //   const items = JSON.parse(localStorage.getItem('items'));
  //   if (items) {
  //    setItems(items);
  //   }
  // }, []);

  const PORT = 5000
  const baseURL = 'http://localhost'
  const extensionURL = '/api'

  const submit = (e) => {
    e.preventDefault();
    console.log('submitting, Email: ', email, ', password: ', password)
    axios.post(`${baseURL}:${PORT}${extensionURL}/login`, {
      email,
      password
    }).then((res) => {
      //console.log('res: ', res);
      //console.log('token: ', res.data.token);
      const token = (JSON.stringify('Bearer ' + res.data.token))
      console.log('TOKEN: ', token)
      localStorage.setItem('token', token)
    }).then(() => {
      navigate("/user", { replace: true });
    })
  }


  useEffect(() => {

    const getToken = async () => {
      const bearerLoginToken = JSON.parse(localStorage.getItem('login'));
      if(bearerLoginToken){
        const loginEmail = jwt_decode(bearerLoginToken.replace('Bearer ', '')).login.email
        console.log('loginEmail: ', loginEmail)
        const loginPassword = jwt_decode(bearerLoginToken.replace('Bearer ', '')).login.password
        console.log('loginPassword: ', loginPassword)
  
        setEmail(loginEmail)
        setPassword(loginPassword)
        console.log(loginEmail)
        console.log(loginPassword)
        localStorage.removeItem('login');
      }
      // SetUser(jwt_decode(bearerToken.replace('Bearer ', '')).user)
      // return jwt_decode(bearerToken.replace('Bearer ', '')).user.id
    }
    getToken()
  }, [])



  return (
    <div>
      <label>email</label>
      <input type="email" onChange={e => setEmail(e.target.value)} value={email} />
      <br />
      <label>Password</label>
      <input type='password' onChange={e => setPassword(e.target.value)} value={password}></input>
      <br />
      <button onClick={submit}>Log In</button>
    </div>
  )
}

export default Login