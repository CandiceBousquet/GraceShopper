import React, { Component } from 'react';
import {Link} from 'react-router';

export default function(props){

    return(
        <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
                <div className="navbar-header">                   
                    <Link to="/" className="navbar-brand"><img src="https://fontmeme.com/permalink/170613/ca34aa4d57ed263198db442e8a112956.png" alt="dining with the stars" border="0" height="50" /></Link>
                </div> 
              {
                props.user.name ?
                (
                  <ul style={{float:"right"}} className="nav navbar-nav nav-options">
                      <li><a href="#" style={{"text-decoration": "none"}} onClick={ () =>{props.logOut()}}>Logout</a></li>
                      {props.user.isAdmin ? <li><Link to="/admin">Admin Panel</Link></li> : null}
                      <li><Link className="glyphicon glyphicon-shopping-cart" to="/cart"></Link></li>
                  </ul>
                  
                  )
                :
                (
                    <ul style={{float:"right"}} className="nav navbar-nav nav-options">
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Signup</Link></li>
                        <li><Link className="glyphicon glyphicon-shopping-cart" to="/cart"></Link></li>
                    </ul>
                 
                  )
              }
              
          </div>
        </nav>
        </div>
    )
}