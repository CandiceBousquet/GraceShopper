import React, { Component } from 'react';
import { Link } from 'react-router';

export default function({item}){

	const divStyle = {
	  backgroundImage: 'url(' + item.imageUrl + ')',
	  width: '150px',
	  height: '150px',
	  backgroundSize: 'cover'
	};

	const itemStyle = {
		padding: '10px'
	}

	const id = `item-${item.id}`;
	return (
		<div className='col-md-3' style={itemStyle}>
			<div style={divStyle} id={id} />
			<Link to={`/item/${item.id}`}>
				{item.name}
			</Link>
			<p>$ {item.price}</p>
		</div>
	)
}