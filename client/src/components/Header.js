import React from 'react'
import '../App.css'
import {
    Routes,
    Route,
    Link,
} from "react-router-dom";

import Login from './Login';
import About from './About';
import Signup from './Signup';
import User from './User'
import Home from './Home'
import Logout from './Logout';




const Header = () => {


    return (
        <div >
            <nav className='Nav-Header'>
                <div>
                    <title>Stock watch</title>
                    <Link to={'/'} style={{ textDecoration: 'none' }}><button className='Nav-Home-btn'>Stock Watch</button></Link>
                </div>
                <div>
                    <Link to={'/login'} style={{ textDecoration: 'none' }}>
                        <button className='btn'>Log in</button>
                    </Link>
                    <Link to={'/signup'} style={{ textDecoration: 'none' }}>
                        <button className='btn'>Sign up</button>
                    </Link>
                    <Link to={'/user'} style={{ textDecoration: 'none' }}>
                        <button className='btn'>User</button>
                    </Link>
                    <Link to={'/about'} style={{ textDecoration: 'none' }}>
                        <button className='btn'>About</button>
                    </Link>
                    <Link to={'/highscores'} style={{ textDecoration: 'none' }}>
                        <button className='btn'>High Scores</button>
                    </Link>


                    <Logout />
                </div>
            </nav>
        </div>
    )
}

export default Header

/*
                    <Link to={'/Logout'} style={{ textDecoration: 'none' }}>
                        <button className='btn'>Logout</button>
                        
                    </Link>

        <Routes>
          <Route path="/" element={<Header />}>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/user' element={<User />} />
            <Route path='/about' element={<About />} />
            <Route path='/home' element={<Home />} />
          </Route>
        </Routes>



        
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="about">About</Link>
      </nav>

*/