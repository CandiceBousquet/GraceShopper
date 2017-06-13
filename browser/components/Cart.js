import React, { Component } from 'react';
import { Link } from 'react-router';

export default function ({ currentCart, user, removeCart, removeItem, submitOrder, processingOrder }){

    return (
        <div className="cart">
            <h2 className="cart-header">MY CART</h2>
            <div>
            {
                currentCart.items ?

                    <table>
                        <tr className="table-headers">
                            <td>Dining Companion</td>
                            <td></td>
                            <td>Description</td>
                            <td>Price</td>
                            <td>Remove?</td>
                        </tr>
                    {
                        currentCart.items.map(item => {

                            return (
                                <tr key={item.id}>
                                    <td><img src={item.imageUrl} width="100px" /></td>
                                    <td><h5>{item.name}</h5></td>
                                    <td><p>{item.description}</p></td>
                                    <td><p>${item.price}</p></td>
                                    <td><button className="btn btn-default btn-xs" onClick={() => removeItem(item.id)}>
                                        <span className="glyphicon glyphicon-remove" />
                                    </button></td>
                                </tr>
                            )

                        })
                    }   
                    </table>

                :
                <h4 className='specialCursive'>Nothing in your cart yet. Get shopping!</h4>
            }
            </div>
            
            {
                currentCart.id && !processingOrder ?
                (<div>
                    <h4 className="table-headers">Total: $ {currentCart.totalPrice}</h4>
                    <button className="btn remove-cart" onClick={() => removeCart(currentCart.id)}>Delete Current Order</button>
                    <button className='btn btn-primary'><Link className="specialLink" to={'/items'}>Continue Shopping</Link></button>
                    <button className='btn btn-success' onClick={() => submitOrder(currentCart, user.id)}>Continue to Checkout</button>
                </div>
                )
                :
                null
            }
        </div>
    );
}
