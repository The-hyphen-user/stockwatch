import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Header from './components/Header';
import Home from './components/Home'
import Login from './components/Login';
import About from './components/About';
import Signup from './components/Signup';
import User from './components/User'




function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/user' element={<User />} />
            <Route path='/about' element={<About />} />
            <Route path='/home' element={<Home />} />
            
          
        </Routes>
    </div>
  );
}

export default App;


          //<Route path="/" element={}>
/*


      <header className='App-header'>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/user' element={<User />} />
            <Route path='/about' element={<About />} />
            <Route path='/home' element={<Home />} />
          </Route>
        </Routes>
      </header>

*/