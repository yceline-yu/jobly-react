import "bootstrap/dist/css/bootstrap.css";
import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter } from "react-router-dom";
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
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  console.log(`App Start isLoggedIn + currentU + isLoadingUser `, isLoggedIn, currentUser, isLoadingUser);

  
  
  useEffect(function changeUserFromToken(){
    let localToken = localStorage.getItem("item");
    console.log("App changeUserFromToken localT", localToken);
    if(localToken) {
      setIsLoggedIn(true);
      JoblyApi.token = localToken;
    }
    async function userAPICall(){
        try {
          console.log("App userAPICall joblyapi token", JoblyApi.token)
          let userPayload = jwt_decode(JoblyApi.token);
          setIsLoadingUser(true);
          let response = await JoblyApi.getUser(userPayload.username);
          setCurrentUser(response);
          //re-render here
          setIsLoadingUser(false);
        } catch (err) {
          console.log("App userAPICall err", err);
          setIsLoadingUser(false);
          setIsLoggedIn(false);
          localStorage.clear();
           
        } 
    }
    if (isLoggedIn) {
      userAPICall();
    }
  }, [isLoggedIn])

  /** Gets auth token from backend on login, sets it on JoblyApi.token,
   * and in localstorage */
  async function login(formData) {
      let tokenRes = await JoblyApi.authenticate(formData);
      setIsLoggedIn(true);
      localStorage.setItem("item", tokenRes);
  }

  /** Gets auth token from backend on login, sets it on JoblyApi.token,
   * and in localstorage */
  async function signup(formData) {
    let tokenRes = await JoblyApi.register(formData);
    localStorage.setItem("item", tokenRes);
    setIsLoggedIn(true);
  }

  /** Clears local storage and logs user out */
  async function logout(){
    localStorage.clear();
    setCurrentUser(null);
    setIsLoggedIn(false);
  }

  console.log("App pre-return localStorage token + isLoadingUser", localStorage.getItem("item"), isLoadingUser)
  if (localStorage.getItem("item") && isLoadingUser) {
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
