import React, { Component } from 'react';
import {Link} from 'react-router';

export default function(props){

    return(
        <nav className="navbar navbar-default">
          <div className="container-fluid">
                <ul className="nav navbar-nav" style={{width:"100%"}}>
                    <div className="navbar-header">
                        <Link to="/" className="navbar-brand">DOA Lunch Shopper</Link>
                    </div>
                    <li><Link to="/items">People</Link></li>
                    <li style={{float:"right"}}>
                    <Link to="/cart">
                        <span className="glyphicon glyphicon-shopping-cart"></span>Cart
                    </Link></li>
              {
                  props.user.name ?
                  <li><button className="btn btn-primary" onClick={ () =>{props.logOut()}}>Logout</button></li>
                  :
                  (<ul className="nav navbar-nav" style={{float:"right"}}>
                    <li style={{float:"right"}}><Link to="/login">Login</Link></li>
                    <li style={{float:"right"}}><Link to="/signup">Signup</Link></li>
                  </ul>)
              }
              {
                props.user.isAdmin ? <li style={{float:"right"}}>My Account</li> : null
              }
              </ul>
          </div>
        </nav>
    )
}