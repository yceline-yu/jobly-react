import React from "react";
import { NavLink } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import "./Navigation.css";



/** Navigation
 * 
 * props: currentUser {username: ..., firstName: ..., ... }
 * state: none
 * 
 * App -> Navigation
 */
function Navigation({ currentUser }) {

  console.log("navigation curren user", currentUser)

  function getNavLinks(currentUser) {
    if (currentUser === null || currentUser === undefined) {
      return (<>
        <Nav.Item as="li">
          <Nav.Link>
            <NavLink exact to="/login">
              Login
            </NavLink>
          </Nav.Link>
        </Nav.Item>

        <Nav.Item as="li">
          <Nav.Link>
            <NavLink exact to="/signup">
              Sign Up
            </NavLink>
          </Nav.Link>
        </Nav.Item></>
      );
    } else {
      return (
        <>
          <Nav.Item as="li">
            <Nav.Link>
              <NavLink exact to="/companies">
                Companies
              </NavLink>
            </Nav.Link>
          </Nav.Item>

          <Nav.Item as="li">
            <Nav.Link>
              <NavLink exact to="/jobs">
                Jobs
              </NavLink>
            </Nav.Link>
          </Nav.Item>

          <Nav.Item as="li">
            <Nav.Link>
              <NavLink exact to="/profile">
                Profile
              </NavLink>
            </Nav.Link>
          </Nav.Item>

          <Nav.Item as="li">
            <Nav.Link>
              <NavLink exact to="/logout">
                Log Out
              </NavLink>
            </Nav.Link>
          </Nav.Item></>
      );
    }
  }
  return (
    <Nav as="ul" variant="tabs" className="Navigation Nav justify-content-center">
      <Nav.Item as="li">
        <Nav.Link>
          <NavLink exact to="/">
            Jobly
          </NavLink>
        </Nav.Link>
      </Nav.Item>
      {getNavLinks(currentUser)}
    </Nav>
  );
}

export default Navigation;