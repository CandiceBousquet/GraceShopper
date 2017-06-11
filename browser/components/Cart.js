import React, { Component } from 'react';
import { removeItem, removeCart } from '../action-creators/cart';


export default function ({ currentCart, cartHistory, user, removeItem, submitOrder }){
    console.log("========================")
    console.log(currentCart)
    // console.log(props.history)
    console.log("========================")
    return (
        <div>
            <div>
                <h3>Current Order</h3>
                <ul>
                    {
                        
                        currentCart.items ?    

                        currentCart.items.map(item => {
                            
                            return (      
                                <div key={item.id}>
                                    <h5>Name: {item.name}</h5>
                                    <img  src={item.imgUrl}   />
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
                    <button onClick={() => submitOrder(currentCart, user.id)}>Submit Order</button>
                    :
                    null
                }
                 

            </div>
            <div>
                <h3>Order History</h3>
                {
                    cartHistory ?

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
                                <p>Please <Link to={'/login'}>log in</Link></p>          
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
/* 
    {

                    currentCart ?
                    currentCart.map(item => (
                    <li key={item.id}>{item.name}</li>
                    ))
                    :
                    null
                }



*/