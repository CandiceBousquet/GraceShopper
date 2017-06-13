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
                <div className="col-md-6">
                    <h3> Existing User? Log in! </h3>
                    <Login />
                </div>
                <div className="col-md-6">
                    <h3> New User? Sign up! </h3>
                    <Signup />
                </div>
                <h3> Or ... </h3>
                <button className="btn-warning btn"><Link to={'/payment'}>Continue as guest</Link></button>
                <p></p>
            </div>
        )
    }
}
