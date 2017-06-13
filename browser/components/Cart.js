import React, { Component } from 'react';
import { Link } from 'react-router';

export default function ({ currentCart, cartHistory, user, removeCart, removeItem, submitOrder }){

    return (
        <div>
            <div>
                <h3>Current Order</h3>
                { currentCart.items ?
                    <button className="btn btn-default btn-xs" onClick={() => removeCart(currentCart.id)}>Delete Current Order</button>
                : null
                }

                <ul>
                {
                    currentCart.items ?

                        currentCart.items.map(item => {

                            return (
                                <div key={item.id}>
                                    <h5>Name: {item.name}</h5>
                                    <img  src={item.imageUrl} width="150px" height="150px" />
                                    <p>Description: {item.description}</p>
                                    <button className="btn btn-default btn-xs" onClick={() => removeItem(item.id)}>
                                        <span className="glyphicon glyphicon-remove" />
                                    </button>
                                </div>
                            )

                        })

                    :
                    <h2>No Items Added</h2>
                }
                </ul>
                {
                    currentCart.id ?
<<<<<<< HEAD
                    <div>
                        <button onClick={() => submitOrder(currentCart, user.id)}>Submit Order</button>
                        <button>Continue Shopping</button>
                    <div>
=======
                    (<div>
                        <button onClick={() => submitOrder(currentCart, user.id)}>Submit Order</button>
                        <button><Link to={'/items'}>Continue Shopping</Link></button>
                    </div>
                    )
>>>>>>> eb062b11989eaa74ccc9077a0c27647283eb09de
                    :
                    null
                }


            </div>
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
        </div>
    );
}
