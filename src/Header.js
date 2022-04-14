import React from 'react';
import { Navbar, NavItem, Image } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './Header.css';
import { useAuth0 } from "@auth0/auth0-react";
import Login from "./Login"
import Logout from "./Logout"



const Header = () => {
  const { user, isLoading, isAuthenticated } = useAuth0();
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand>My Favorite Books</Navbar.Brand>
      <NavItem><Link to="/" className="nav-link">Home</Link></NavItem>
      <NavItem><Link to="/about" className="nav-link">About</Link></NavItem>
      <div className='separator'/>
      {isAuthenticated ? (
        <>
          {!isLoading && (
            <NavItem><Link to="/profile" className="nav-link"><Image width={'50px'} height={'50px'} src={user.picture} alt={user.name} className='profile-picture' /></Link></NavItem>
          )}
          <NavItem><Logout /></NavItem>
        </>
      ) : (
        <NavItem><Login /></NavItem>
      )}
      
    </Navbar>
  )
}

export default Header;
