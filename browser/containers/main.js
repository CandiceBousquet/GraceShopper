import Navbar from '../components/Navbar';
import React, { Component } from 'react';

export default class extends Component {
	constructor(props){
		super(props)
	}
	render () {
			return (
				<div className='container'>
					<Navbar />
					{
						this.props.children ? this.props.children : null
					}
				</div>
		)
	}
} 