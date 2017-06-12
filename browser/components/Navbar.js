import React, { Component } from 'react';
import {Link} from 'react-router';

export default function(props){

    return(
        <nav className="navbar navbar-default">
          <div className="container-fluid">
          
              {
                props.user.name ?
                (
                  <ul className="nav navbar-nav">
                      <div className="navbar-header">
                        <Link to="/" className="navbar-brand">DOA Lunch Shopper</Link>
                        </div>  
                      <li><Link to="/items">People</Link></li>
                      <li ><Link to="/cart">Cart</Link></li>
                      <li><button className="btn btn-primary" onClick={ () =>{props.logOut()}}>Logout</button></li>
                  </ul>
                  
                  )
                :
                (
                    <ul className="nav navbar-nav">
                    <div className="navbar-header">
                        <Link to="/" className="navbar-brand">DOA Lunch Shopper</Link>
                        </div>  
                        <li><Link to="/items">People</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li ><Link to="/signup">Signup</Link></li>
                        <li ><Link to="/cart">Cart</Link></li>
                  </ul>
                 
                  )
              }
              
          </div>
        </nav>
    )
}