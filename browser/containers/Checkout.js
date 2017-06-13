import React from 'react';
import Login from './Login'
import Signup from './Signup'
import {Link } from 'react-router'
/* -----------------    COMPONENT     ------------------ */

export default class Checkout extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div>
                <h3> Existing User? Log in! </h3>
                <Login />

                <h3> New User? Sign up! </h3>
                <Signup />

                <h3> Or ... </h3>
                <button className="btn-warning btn"><Link to={'/stripe'}>Continue as guest</Link></button>
                <p></p>
            </div>
        )
    }
}
