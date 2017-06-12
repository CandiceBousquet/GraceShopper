import Navbar from '../components/Navbar';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logOut } from '../action-creators/login';


class Main extends Component {
	constructor(props){
		super(props)
	}
	render () {
			return (
				<div className='container'>
					<Navbar user={this.props.user} logOut ={this.props.logUserOut}/>
					{
						this.props.children ? this.props.children : null
					}
				</div>
		)
	}
} 


const mapToState = state => {
	return {
		cart: state.cart,
		user: state.user
	}
};


const mapDispatch = dispatch => ({
	logUserOut: () =>{
		dispatch(logOut());
	}
});
export default connect(mapToState, mapDispatch)(Main);