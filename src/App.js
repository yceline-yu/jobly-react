import "bootstrap/dist/css/bootstrap.css";
import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, useHistory } from "react-router-dom";
import Navigation from "./Navigation";
import Routes from "./Routes";
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
  const history = useHistory();
  console.log(`history is ===> `, history);
  console.log(`isLoggedIn is ===> `, isLoggedIn);
 
  
  console.log("App curr user", currentUser);

  let localToken = localStorage.getItem("item");


  useEffect(function changeUserFromToken(){
    if(localToken){
      setIsLoggedIn(true);
      JoblyApi.token = localToken;
    }
    async function userAPICall(){
        let localToken = localStorage.getItem("item");
        console.log("EFFECT localStorage", localStorage);
        let userPayload = jwt_decode(localToken);
        console.log("EFFECT userpayload =>", userPayload)
        let response = await JoblyApi.getUser(userPayload.username);
        console.log("EFFECT RESPONSE", response)
        setCurrentUser(response);
    }
    if (isLoggedIn){userAPICall();}
  }, [isLoggedIn, currentUser])

  async function login(formData) {
      let tokenRes = await JoblyApi.authenticate(formData);
      JoblyApi.token = tokenRes;
      setIsLoggedIn(true);
      localStorage.setItem("item", tokenRes);
      console.log("TOKEN LOCAL SET")
  }

  async function signup(formData) {
    let tokenRes = await JoblyApi.register(formData);
    JoblyApi.token = tokenRes;
    localStorage.setItem("item", tokenRes);
    setIsLoggedIn(true);
  }

  async function logout(){
    localStorage.clear();
    setCurrentUser(null);
    setIsLoggedIn(false);
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
