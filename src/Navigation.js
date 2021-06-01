import React from "react";
import { NavLink } from "react-router-dom";
// import "./NavBar.css";

function Navigation({currentUser}) {

  if (currentUser === null) {
    return (<nav className="NavBar">
      <NavLink exact to="/">
        Jobly
        </NavLink>
      <NavLink exact to="/login">
        Login
        </NavLink>
      <NavLink exact to="/signup">
        Sign Up
        </NavLink></nav>)
  } else {
    return (<nav className="NavBar">
      <NavLink exact to="/">
        Jobly
        </NavLink>
      <NavLink exact to="/companies">
        Companies
        </NavLink>
      <NavLink exact to="/jobs">
        Jobs
        </NavLink>
      <NavLink exact to="/profile">
        Profile
        </NavLink>
      <NavLink exact to="/logout">
        Log Out
        </NavLink>
    </nav>)

  }
}


export default Navigation;