import React, { useEffect } from "react";
import "../App.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

import Login from "./Login";
import About from "./About";
import Signup from "./Signup";
import User from "./User";
import Home from "./Home";
import Logout from "./Logout";
import { useState } from "react";
import Stack from "@mui/material/Stack";
//import Button from '@mui/material/Button';
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Grid from "@material-ui/core/Grid";

import { createTheme } from "@mui/material/styles";
import { purple } from "@mui/material/colors";

const Header = () => {

//   const theme = createTheme({
//     palette: {
//       primary: {
//         main: "#303f9f",
//       },
//       secondary: {
//         main: "#d32f2f",
//       },
//     },
//   });

  const [token, setToken] = useState(null);

  const checkToken = () => {
    console.log("checkToken");
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    } else {
      setToken(null);
    }
  };

  //window.addEventListener("storage", checkToken);
  useEffect(() => {
    window.addEventListener("storage", (e) => {
      // ...
      checkToken();
      console.log("listener: ", e);
    });
  }, []);

    
  let navigate = useNavigate();

  const logout = () => {
    //if headers have token named token, delete it
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
    }
    navigate("/");
  };

  return (
    <div>
      <nav className="Nav-Header">
        <div>
          <title>Stock watch</title>
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <button className="Nav-Home-btn">Stock Watch</button>
          </Link>
        </div>
        {token ? <div>token</div> : <div>no token</div>}
        <div>
          <Grid container spacing={2} >
          <Grid item>
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <Button variant="contained" color="primary">Home</Button>
            </Link></Grid>
          <Grid item>
            <Link to={"/login"} style={{ textDecoration: "none" }}>
              <Button variant="contained" color="primary">Log In</Button>
            </Link></Grid>
          <Grid item>
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <Button onClick={logout} variant="contained" color="primary">Log Out</Button>
            </Link></Grid>
          <Grid item>
            <Link to={"/user"} style={{ textDecoration: "none" }}>
              <Button variant="contained" color="primary">User</Button>
            </Link></Grid>
          <Grid item>
            <Link to={"/about"} style={{ textDecoration: "none" }}>
              <Button variant="contained" color="primary">About</Button>
            </Link></Grid>
          <Grid item>
            <Link to={"/highscores"} style={{ textDecoration: "none" }}>
              <Button variant="contained" color="primary">High Scores</Button>
            </Link></Grid>
          <Grid item>
            <Link to={"/signup"} style={{ textDecoration: "none" }}>
              <Button variant="contained" color="primary">Sign Up</Button>
            </Link></Grid>
          </Grid>
        </div>
      </nav>
    </div>
  );
};

export default Header;

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




/***
 * 
 * 
        <div>
          <Button variant="contained" color="primary">
            words
          </Button>
          <Link to={"/login"} style={{ textDecoration: "none" }}>
            <button className="btn">Log in</button>
          </Link>
          <Link to={"/signup"} style={{ textDecoration: "none" }}>
            <button className="btn">Sign up</button>
          </Link>

          <Link to={"/user"} style={{ textDecoration: "none" }}>
            <button className="btn">User</button>
          </Link>

          <Link to={"/about"} style={{ textDecoration: "none" }}>
            <button className="btn">About</button>
          </Link>
          <Link to={"/highscores"} style={{ textDecoration: "none" }}>
            <button className="btn">High Scores</button>
          </Link>

          <Logout />
        </div>
 */
