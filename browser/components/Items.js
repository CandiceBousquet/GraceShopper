import React, { Component } from 'react';
import { Link } from 'react-router';

export default function({item}){

	const divStyle = {
	  backgroundImage: 'url(' + item.imageUrl + ')',
	  width: '170px',
	  height: '170px',
	  backgroundSize: 'cover'
	};

	const id = `item-${item.id}`;
	return (
		<div className='col-md-3 item'>
			<div className='center'>
				<div className='center' style={divStyle} id={id} />
				<p />
				<Link className ='text-center' to={`/item/${item.id}`}>
					{item.name}
				</Link>
				<p className='text-center' >$ {item.price}</p>
			</div>
		</div>
	)
}