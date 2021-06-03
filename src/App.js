import "bootstrap/dist/css/bootstrap.css";
import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, useHistory } from "react-router-dom";
import Navigation from "./Navigation";
import Routes from "./Routes";
import JoblyApi from "./api";
import jwt_decode from "jwt-decode";
//import { useHistory } from "react-router-dom";



function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);
  const history = useHistory();
  console.log(`history is ===> `, history)
 

  console.log("App curr user", currentUser);
  console.log("App token", token);


  useEffect(function changeUserFromToken(){
    async function userAPICall(){
      if (token){
        let userPayload = jwt_decode(token)
        console.log(userPayload)
        let response = await JoblyApi.getUser(userPayload.username);
        console.log("EFFECT RESPONSE", response)
        setCurrentUser(response);
      }
    }
      userAPICall();
  }, [token])

  async function login(formData) {
      let tokenRes = await JoblyApi.authenticate(formData);
      JoblyApi.token = tokenRes;
      setToken(tokenRes);
  }

  async function signup(formData) {
    let tokenRes = await JoblyApi.register(formData);
    setToken(tokenRes);
  }

  async function logout(){
    setCurrentUser(null);
    setToken(null);
  }

    return (
      <div className="App">
        <BrowserRouter>
          <Navigation currentUser={currentUser} />
          <Routes login={login} signup={signup} currentUser={currentUser} logout={logout} />
          </BrowserRouter>
      </div>
    );
  }

  export default App;
