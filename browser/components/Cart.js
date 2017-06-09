import React, { Component } from 'react';
import { removeItem, removeCart } from '../action-creators/cart';


export default function ({ currentCart, cartHistory }){
    console.log(currentCart);
    return (
        <div>
            <div>
                <h3>Current Order</h3>
                <button className="btn btn-default btn-xs" onClick={() => removeCart(currentCart.id)}>
                <span className="glyphicon glyphicon-remove" />
                </button>
                <ul>
                {

                    currentCart ?
                    currentCart.map(item => (
                    <li key={item.id}>{item.name}</li>
                    ))
                    :
                    null
                }
                </ul>
            </div>
            <div>
                <h3>Order History</h3>
                {
                    cartHistory ?
                    cartHistory.map(order => (
                    <div key={order.id}>
                        <p>{order.updatedAt}</p>
                        <ul>
                            order.items.map(item => (
                                <li key={item.id}>{item.name}
                                    <button className="btn btn-default btn-xs" onClick={() => removeItem(item.id)}>
                                        <span className="glyphicon glyphicon-remove" />
                                    </button>
                                </li>
                            ))
                        </ul>
                    </div>
                    ))
                    : null
                }
            </div>
        </div>
    );
}
