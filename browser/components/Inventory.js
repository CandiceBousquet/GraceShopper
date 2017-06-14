import React from 'react';

export default function ({items}) {
	return (
		<div>
			<h2 className='selected-item-header'>Manage People</h2>
			{
				items ?
				items.map(item => (
					<div key={item.id}>
						<h5>{item.name}</h5>
						<p>Number of available appointments: {item.quantity}</p>
					</div>)
				) : null
			}
		</div>
	)
}