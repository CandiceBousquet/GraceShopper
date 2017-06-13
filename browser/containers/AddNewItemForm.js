import React, { Component } from 'react';

export default class AddNewItemForm extends Component {
	constructor (props) {
		super(props);
		this.state = { name: null, price: null };
		this.handleChange = this.handleChange.bind(this);
		this.handleAddItem = this.handleAddItem.bind(this);
	}

	handleAddItem (evt) {
		evt.preventDefault();
		this.props.addItem();
	}

	handleChange (key) {
		return (val) => {
			this.setState[key] = val;
		}
	}

	render () {
		return (
			<div className='form-group'>
			<h3>Add New Person</h3>
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
			</form>
			</div>
		)
	}
}
