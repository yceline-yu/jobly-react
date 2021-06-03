import "bootstrap/dist/css/bootstrap.css";
import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter } from "react-router-dom";
import Navigation from "./Navigation";
import Routes from "./Routes";
import JoblyApi from "./api";
// import DecodeToken from "./DecodeToken";
import { decodeToken, useJwt } from "react-jwt";



function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);
  console.log("App curr user", currentUser);
  console.log("App token", token);


  useEffect(function changeUserFromToken(){
    async function userAPICall(){
      console.log("currentUser IN EFFECT", currentUser, "TOKEN", token);
      //fix this - jwt decode to get username
      let response = await JoblyApi.getUser('tester1');
      console.log("EFFECT RESPONSE", response)
      setCurrentUser(response);
    }
      userAPICall();
  }, [token])

  async function login(formData) {
    try {
      let tokenRes = await JoblyApi.authenticate(formData);
      JoblyApi.token = tokenRes;
      setToken(tokenRes);
    } catch (err) {
      console.log(err)
    }
  }

  async function signup(formData) {
    try {
      let tokenRes = await JoblyApi.register(formData);
      setToken(tokenRes);
    } catch (err) {
      console.log(err)
    }
  }

    return (
      <div className="App">
        <BrowserRouter>
          <Navigation currentUser={currentUser} />
          <Routes login={login} signup={signup} currentUser={currentUser} />
        </BrowserRouter>
      </div>
    );
  }

  export default App;
