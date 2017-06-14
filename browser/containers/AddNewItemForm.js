import React, { Component } from 'react';

export default class AddNewItemForm extends Component {
	constructor (props) {
		super(props);
		this.state = { name: null, description: null, price: null, quantity: null };
		this.handleChange = this.handleChange.bind(this);
		this.handleAddItem = this.handleAddItem.bind(this);
	}

	handleAddItem (evt) {
		this.props.addItem(this.state);
	}

	handleChange (key) {
		return (evt) => {
			this.setState({[key]: evt.target.value});
		}
	}

	render () {
		return (
			<div className='form-group'>
			<h2 className='selected-item-header'>Add New Person</h2>
			<form onSubmit={this.handleAddItem}>
				<label>Name</label>
				<input type='text' className="form-control" onChange={this.handleChange('name')}></input>
				<label>Description</label>
				<textarea type='text' className="form-control" onChange={this.handleChange('description')}></textarea>
				<label>Price</label>
				<div className='input-group'>
					<span className='input-group-addon'>$</span>
					<input type='text' className="form-control" onChange={this.handleChange('price')}></input>
				</div>
				<label>Number of Lunches</label>
				<input type='text' className="form-control" onChange={this.handleChange('quantity')}></input>
				<button type='submit' className='btn btn-success'>Add Person</button>
			</form>
			</div>
		)
	}
}
