import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createNewItem, removeItem } from '../action-creators/item';
import AddNewItemForm from './AddNewItemForm';
import Inventory from '../components/Inventory';

class AdminContainer extends Component {
	constructor(props) {
		super(props);
		this.state = { addingPeople: true };
		this.handleToggle = this.handleToggle.bind(this);
	}

	handleToggle(activeTab) {
		if (activeTab === 'addNewPerson') {
			this.setState({ addingPeople: true });
		} else if (activeTab === 'managePeople') {
			this.setState({ addingPeople: false });
		}
	}

	render () {
		const addPersonClass = this.state.addingPeople ? "active" : null;
		const managePeopleClass = this.state.addingPeople ? null : "active";
		return (
			<div>
			<ul className="nav nav-tabs">
			  <li className={addPersonClass} onClick={() => this.handleToggle('addNewPerson')}><a href="#">Add Person</a></li>
			  <li className={managePeopleClass} onClick={() => this.handleToggle('managePeople')}><a href="#">Manage People</a></li>
			</ul>
			{ this.state.addingPeople ? 
				<AddNewItemForm addItem={this.props.addItem} /> :
				<Inventory items={this.props.items} removeItem={this.props.removeItem} />
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
			dispatch(createNewItem(item));
		},
		removeItem: (itemId) => {
			dispatch(removeItem(itemId));
		}
	})
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(AdminContainer);