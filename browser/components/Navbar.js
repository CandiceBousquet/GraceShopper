import React, { Component } from 'react';
import {Link} from 'react-router';

export default function(props){
    return(
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand">DOA Lunch Shopper</a>
            </div>
            <ul className="nav navbar-nav">
              <li><Link to="/">People</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li ><Link to="/signup">Signup</Link></li>
            </ul>
          </div>
        </nav>
    )
}