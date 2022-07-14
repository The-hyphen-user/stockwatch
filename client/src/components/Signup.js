import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import Login from './Login'
import { useNavigate } from "react-router-dom";

const Signup = () => {

  const [email, setEmail] = useState('dan@email.com')
  const [username, setUsername] = useState('dan')
  const [password, setPassword] = useState('password1')
  const [sucess, setSucess] = useState(false)
  let navigate = useNavigate();



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
      if (res.status === 200){
        //setSucess(true)
        console.log(res)
        const token =  (JSON.stringify('Bearer '+ res.data.login))
      localStorage.setItem('login', token)
      
      console.log('token: ', token)
      }
      console.log(res);
    }).then(() => {
      setSucess(true)
      setTimeout(() => {
        navigate("/login", { replace: true });
        }, 1500);
      
    })
  }


//<Login signupmail={email} signupPassword={password}/>

  return (
    <div>{sucess ? 
      <div> 
        <h1>Login Sucess!</h1>
        
      </div>
     : 
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
      </form></div>
    
    }
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
