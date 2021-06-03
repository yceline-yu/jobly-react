import "bootstrap/dist/css/bootstrap.css";
import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, useHistory } from "react-router-dom";
import Navigation from "./Navigation";
import Routes from "./Routes";
import PrivateRoutes from "./PrivateRoutes"
import JoblyApi from "./api";
import jwt_decode from "jwt-decode";


/** App
 * 
 * State:
 *  - currentUser {username, isAdmin, firstName, lastName,...}
 *  - isLoggedIn (boolean)
 * 
 * App -> { Navigation, Routes }
 */
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("item"))
  const history = useHistory();
  console.log(`history is ===> `, history);
  console.log(`isLoggedIn is ===> `, isLoggedIn);
 
  
  console.log("App curr user", currentUser);

  
  
  useEffect(function changeUserFromToken(){
    setToken(localStorage.getItem("item"));
    JoblyApi.token = token;
    if(JoblyApi.token) {
      setIsLoggedIn(true);
    }
    //todo try/catch here to handle error if token invalid
    async function userAPICall(){
        try {
          let userPayload = jwt_decode(JoblyApi.token);
          let response = await JoblyApi.getUser(userPayload.username);
          setCurrentUser(response);
        } catch (err) {
          localStorage.clear();
           
        } 
    }
    if (isLoggedIn) {
      userAPICall();
    }
  }, [isLoggedIn, token])

  /** Gets auth token from backend on login, sets it on JoblyApi.token,
   * and in localstorage */
  async function login(formData) {
      let tokenRes = await JoblyApi.authenticate(formData);
      JoblyApi.token = tokenRes;
      setIsLoggedIn(true);
      localStorage.setItem("item", tokenRes);
      setToken(localStorage.getItem("item"));
      console.log("TOKEN LOCAL SET")
  }

  /** Gets auth token from backend on login, sets it on JoblyApi.token,
   * and in localstorage */
  async function signup(formData) {
    let tokenRes = await JoblyApi.register(formData);
    JoblyApi.token = tokenRes;
    localStorage.setItem("item", tokenRes);
    setToken(localStorage.getItem("item"));
    setIsLoggedIn(true);
  }

  /** Clears local storage and logs user out */
  async function logout(){
    localStorage.clear();
    setCurrentUser(null);
    setIsLoggedIn(false);
  }

  console.log(`token & curr user before return`, token, currentUser)
  if (token && currentUser === null) {
    return (
      <h1>loading...</h1>
    )
  }

    return (
      <div className="App">
        <BrowserRouter>
          <Navigation currentUser={currentUser} />
          {currentUser !== null 
          ? <PrivateRoutes currentUser={currentUser} logout={logout}/> 
          : <Routes login={login} signup={signup} currentUser={currentUser} />}
          </BrowserRouter>
      </div>
    );
  }

  export default App;
