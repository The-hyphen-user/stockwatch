import React from 'react'
import '../App.css'
import axios from 'axios';
import { useState } from 'react';

const About = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [messageSent, setMessageSent] = useState(false)

  const PORT = 5000
  const baseURL = 'http://localhost'
  const extensionURL = '/api'

  const sendEmail = (e) => {
    e.preventDefault();
    console.log('submitting, Email: ', email,)
    axios.post(`${baseURL}:${PORT}${extensionURL}/email`, {
      email: email
    })
      .then((res) => {
        console.log('data: ', res.data)
        setMessageSent(true)
      })
      .catch((err) => {
        console.log(err)
      })
    }

  return (
    <div>
      <h3>ABout</h3>
      <p>Welcome to Market watch.
        the goal of this site is to enable people to Practice stock trading with virtual money.
        
      </p>

      <div>
        <h4>things to know</h4>
        <p>
        there is a 1 dollar change on every purchase to avoid making money with rounding errors.
        <br/><br/>
          there will be random users generated to compete against on the high scores. there names will start with -bot-
          <br></br>
          for example -bot-dan  or -bot-joe
          <br/>
          when created they will buy stocks at random and then halt all trading.
          <br/> later i may create bots that buy and sell at random but probably not
        </p>
      </div>
      <div>
        <h4>how to play</h4>
        <p>
          you will be given $10,000 to start with. Your balance is the combined value of all your stocks and balance.
          </p>
          <br/>

      </div>
      <div>
        <h4>contact the creator</h4>
        <h3>currently not hooked up</h3>
        <p>
            <textarea rows="4" cols="50" value={email} onChange={e => setEmail(e.target.value)} />
          <br/>
          <button onClick={() => sendEmail()}>Send</button>

          </p>
          <br/>
          {messageSent ? <p>Message sent</p> : null}

      </div>

    </div>
  )
}

export default About