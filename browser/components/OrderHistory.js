import React from 'react';
import Link from 'react-router';

export default function({cartHistory}) {
    return (
        <div>
            <h3>Order History</h3>
            {
                Object.keys(cartHistory).length ?

                [].slice.call(cartHistory).map(order => {
                    return (
                        <div>
                             <h1>Order Number: {order.id}</h1>
                        {

                            order.items ?
                                order.items.map(item => {
                                    return (
                                        <div key={item.id}>
                                            <h5>Name: {item.name}</h5>
                                            <img  src={item.imgUrl}   />
                                            <p>Description: {item.description}</p>
                                            <div>Purchased At: {item.createdAt}</div>
                                        </div>
                                    )
                                })
                            :
                            <p>Please <Link to={'/login'}>log in</Link> to view order history.</p>
                        }
                        </div>
                    )
                })
                :
                null
            }
        </div>
    )
}