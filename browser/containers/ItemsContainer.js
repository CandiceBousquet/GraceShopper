import React, { Component } from 'react';
import { connect } from 'react-redux';
import Items from '../components/Items';
import { setSingleItem } from '../action-creators/item';

class ItemsContainer extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				{ this.props.items ? this.props.items.map((item) => <Items item={item} key={item.id} />) : null }
			</div>
			)
	}
}

const mapStateToProps = ({ item }) => {
	return { items: item.items };
}


const mapDispatchToState = { setSingleItem };

export default connect(mapStateToProps, mapDispatchToState)(ItemsContainer);