import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Login = () => {


  const [email, setEmail] = useState('dan@email.com')
  const [password, setPassword] = useState('password1')
  const [items, setItems] = useState([]);

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
    console.log('submitting, Email: ', email,', password: ', password)


    axios.post(`${baseURL}:${PORT}${extensionURL}/login`, {
      email,
      password
    }).then((res) => {
      console.log('res: ', res);
      console.log('token: ', res.data.token);
      const token = (JSON.stringify('Bearer '+ res.data.token))
      console.log('TOKEN: ', token)
      localStorage.setItem('token', token)
    })
  }


  return (
    <div>
      <label>email</label>
      <input type="email" onChange={e => setEmail(e.target.value)} value={email} />
      <br />
      <label>Password</label>
      <input onChange={e => setPassword(e.target.value)} value={password}></input>
      <br />
      <button onClick={submit}>Log In</button>
    </div>
  )
}

export default Login