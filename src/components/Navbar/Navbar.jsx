import React, { useState, useContext } from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
import { ShoppingCart, Home, } from '@material-ui/icons';
import Sun from '@iconscout/react-unicons/icons/uil-sun';
import Moon from '@iconscout/react-unicons/icons/uil-moon';
import { Link, useLocation } from "react-router-dom";
import { myContext } from '../Toggle/Switch';

import "./navbar.css"



const Navbar = ({totalItems}) => {
  const theme = useContext(myContext);
  const darkMode = theme.state.darkMode;
  const location = useLocation();
  const handleToggle = () => {
    theme.dispatch({type: "toggle"})
  }
  return (
    <AppBar position="fixed"  
    style={
      {background: darkMode ? "#000" : "#fff",
      color: darkMode ? "#fff" : "#000",
      borderBottom: darkMode ? "2px solid #fff" : "none"
    }
    }>
        <Toolbar className="my-navbar">
          <Typography component={Link} to="/"  variant="h6" className="website-title" color="inherit">
            <img src="favicon.png" alt="eslamo ecommerce" height="25px" className="my-logo" /> eslamo ecommerce
          </Typography>
          
          
          <div className= "right-grow">
            {/* <div 
            className={darkMode ? "toggle-btn toggle-btn-on" : "toggle-btn toggle-btn-off"} 
            onClick={handleToggle}>
              <div className={darkMode ? "round-bulit round-bulit-on" : "round-bulit round-bulit-off"}
              style={{left: darkMode ? "12%" : "59%"}}
              ></div>
                <Sun />
                <Moon />
            </div> */}
              {
                location.pathname=== "/" ? 
                  <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
                    <Badge overlap="rectangular" badgeContent={totalItems} color="secondary">
                      <ShoppingCart />
                    </Badge>
                  </IconButton>
                  : 
                  <IconButton component={Link} to="/" aria-label="Show cart items" color="inherit">
                  <Badge overlap="rectangular" color="secondary">
                    <Home />
                  </Badge>
                </IconButton>
              }
           
          </div>  
        </Toolbar>
      </AppBar>
  )
}

export default Navbar

