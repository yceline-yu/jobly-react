import "bootstrap/dist/css/bootstrap.css";
import './App.css';
import JoblyApi from "./api";
import { useState } from 'react';
import { BrowserRouter } from "react-router-dom";
import Navigation from "./Navigation";
import Routes from "./Routes";


function App() {
  const [currentUser, setCurrentUser] = useState(null)

  function login(formData){
    setCurrentUser(curr => ({...curr,...formData}));
  }

  function signup(formData){
    setCurrentUser(curr => ({...curr,...formData}));
  }
  
  return (
    <div className="App">
    <BrowserRouter>
    <Navigation />
    <Routes login={login} signup={signup} currentUser={currentUser}/>
    </BrowserRouter>
    </div>
  );
}

export default App;
