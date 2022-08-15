import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { TextField, Button } from "@material-ui/core";

const Login = () => {
  //{signupmail, signupPassword}

  const [email, setEmail] = useState("dan@email.com");
  const [password, setPassword] = useState("password1");
  const [items, setItems] = useState([]);
  let navigate = useNavigate();

  const PORT = 5000;
  const baseURL = "http://localhost";
  const extensionURL = "/api";

  const submit = (e) => {
    e.preventDefault();
    console.log("submitting, Email: ", email, ", password: ", password);
    axios
      .post(`${baseURL}:${PORT}${extensionURL}/login`, {
        email,
        password,
      })
      .then((res) => {
        const token = JSON.stringify("Bearer " + res.data.token);
        console.log("TOKEN: ", token);
        localStorage.setItem("token", token);
      })
      .then(() => {
        navigate("/user", { replace: true });
      });
  };

  useEffect(() => {
    const getToken = async () => {
      const bearerLoginToken = JSON.parse(localStorage.getItem("login"));
      if (bearerLoginToken) {
        const loginEmail = jwt_decode(bearerLoginToken.replace("Bearer ", ""))
          .login.email;
        console.log("loginEmail: ", loginEmail);
        const loginPassword = jwt_decode(
          bearerLoginToken.replace("Bearer ", "")
        ).login.password;
        console.log("loginPassword: ", loginPassword);
        setEmail(loginEmail);
        setPassword(loginPassword);
        console.log(loginEmail);
        console.log(loginPassword);
        localStorage.removeItem("login");
      }
    };
    getToken();
  }, []);

  return (
    <div className="login-page">
      <div className="login-container">
        <TextField
          label="Email"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <br />
        <br />
        <TextField
          id="outlined-password-input"
          label="Password"
          variant="outlined"
          autoComplete="current-password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <br />
        <br />
        <Button onClick={submit} variant="contained">
          Log In
        </Button>
      </div>
    </div>
  );
};

export default Login;
