import React from 'react';

export default function ({items, removeItem}) {
	return (
		<div>
			<h2 className='selected-item-header'>Lunch Companions</h2>
			<table>
			<thead>
				<tr className="table-headers">
					<td>Lunch Companion</td>
					<td></td>
					<td>Number of Available Appointments</td>
					<td></td>
				</tr>
			</thead>
			<tbody>
			{
				items ?
				items.map(item => (
					<tr key={item.id}>
						<td><img src={item.imageUrl} width="100px" /></td>
						<td><h5>{item.name}</h5></td>
						<td>{item.quantity}</td>
						<td><button type="button" className="btn btn-default" aria-label="Left Align" onClick={() => removeItem(item.id)}>
						  <span className="glyphicon glyphicon-trash"></span>
						</button></td>
					</tr>)
				) : null
			}
			</tbody>
			</table>
		</div>
	)
}