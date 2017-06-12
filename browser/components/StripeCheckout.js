import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRecentOrder, removeCart, removeItem, updateSubmitCart } from '../action-creators/cart';

/* -----------------    COMPONENT     ------------------ */

class StripeCheckout extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        console.log(this.props);
        return (
            <div>
                { 
                    (this.props.user && this.props.user.name) ? 
                    (
                        <button onClick={() => {this.props.submitOrder(this.props.currentCart, this.props.user.id)}} >Checkout with Stripe</button>
                ) 
                :
                (<form onSubmit={(evt) => {evt.preventDefault(); this.props.submitOrder(this.props.currentCart, 1000000)}}>
                    <p>You\'ve reached stripe checkout page</p>           
                        <input />
                        <input />
                        <button type="submit" >Checkout with Stripe</button>
                </form>
                )
            }
            </div>
            
        )
    }
}


const mapState = state => {
    return {
        currentCart: state.cart.current,
        user: state.user
    };
};

const mapDispatch = dispatch => {
    return {
        removeCart: cartId => {
            dispatch(removeCart(cartId));
        },
        removeItem: itemId => {

            dispatch(removeItem(itemId));
        },
        submitOrder: (cart, userId) => {
            // if (userId) {
                console.log("IN SUBMUT")
                dispatch(updateSubmitCart(cart.id, userId));
            // } else {
            //     dispatch(updateSubmitCart(cart.id, userId));
            // }
        }
    };
};

export default connect(mapState, mapDispatch)(StripeCheckout);