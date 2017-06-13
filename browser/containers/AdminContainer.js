import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addItem, removeItem } from '../action-creators/cart';
import AddNewItemForm from './AddNewItemForm';

class AdminContainer extends Component {
	render () {
		return (
			<div>
			<AddNewItemForm addItem={addItem} />
			<h3>Available VIPs</h3>
				{
					this.props.items ?
					this.props.items.map(item => (
						<div key={item.id}>
							<h5>{item.name}</h5>
							<p>Number of available appointments: {item.quantity}</p>
						</div>)
					) : null
				}
			</div>
		)
	}
}


const mapStateToProps = (state) => {
	return {
		user: state.user,
		items: state.item.items
	}
};

const mapDispatchToProps = (dispatch) => {
	return ({
		addItem: (item) => {
			dispatch(addItem(item));
		},
		removeItem: (item) => {
			dispatch(removeItem(item));
		}
	})
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(AdminContainer);