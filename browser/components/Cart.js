import React, { Component } from 'react';
import { Link } from 'react-router';


export default function ({ currentCart, user, removeCart, removeItem, submitOrder, processingOrder, coupons_codes, appleCouponCodes, discount }){
    const width =  {
        width : '170px'
    }
    
    return (
        <div>
            <h3>Current Order</h3>
            { currentCart && currentCart.items ?
                <button className="btn btn-danger btn-xs" onClick={() => removeCart(currentCart.id)}>Delete Current Order</button>
            : null
            }

            <ul>
            {
                currentCart && currentCart.items ?

                    <div>
                    {
                        currentCart && currentCart.items.map(item => {

                            return (
                                <div key={item.id}>
                                    <h5>Name: {item.name}</h5>
                                    <img  src={item.imageUrl} width="150px" height="150px" />
                                    <p><b>Description:</b> {item.description}</p>
                                    <p><b>Price:</b> ${item.price}</p>
                                    <button className="btn btn-default btn-xs" onClick={() => removeItem(item.id)}>
                                        <span className="glyphicon glyphicon-remove" />
                                    </button>
                                </div>
                            )

                        })
                    }
                    <h4>Total: $ { discount && typeof(discount) != "object" ? discount * currentCart.totalPrice : currentCart.totalPrice}</h4>
                    <form className="input-group" onSubmit={appleCouponCodes}>
                        <span className="input-group-btn">
                            <button className="btn btn-secondary" type="submit">Apply!</button>
                        </span>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="user_coupon"
                            placeholder="Apply Coupon Code!" 
                            style={width } 
                            />
                    </form>
                    </div>

                :
                <h2>No Items Added</h2>
            }
            </ul>
            {
                currentCart.id && !processingOrder ?
                (<div>
                    <button className='btn btn-success' onClick={() => submitOrder(currentCart, user.id)}>Continue to Checkout</button>
                    <button className='btn btn-default'><Link to={'/items'}>Continue Shopping</Link></button>
                </div>
                )
                :
                null
            }
        </div>
    );
}
