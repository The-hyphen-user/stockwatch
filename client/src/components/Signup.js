import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const Signup = () => {

  const [email, setEmail] = useState('dan@email.com')
  const [username, setUsername] = useState('dan')
  const [password, setPassword] = useState('password1')


  const PORT = 5000
  const baseURL = 'http://localhost'
  const extensionURL = '/api'

  const submit = (e) => {
    e.preventDefault();
    console.log('submitting, Email: ', email, ', username: ', username, ', password: ', password)


    axios.post(`${baseURL}:${PORT}${extensionURL}/signup`, {
      email ,
      username ,
      password 
    }).then((res) => {
      console.log(res);
    })
  }




  return (
    <div>
      Signup
      <form>
        <label>email</label>
        <input type="email" onChange={e => setEmail(e.target.value)} value={email} />
        <label>username</label>
        <input onChange={e => setUsername(e.target.value)} value={username} />
        <label>password</label>
        <input type="password" onChange={e => setPassword(e.target.value)} value={password} />
        <button onClick={submit}>submit</button>
      </form>
    </div>
  )
}

export default Signup



/*


      e.preventDefault();
  
      axios.post(`${baseURL}:${PORT}${extensionURL}/login`, {
        email,
        password
      }).then((res) => {
        console.log(res);
      }



*/
