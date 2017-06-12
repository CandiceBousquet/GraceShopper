import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRecentOrder, removeCart, removeItem, updateSubmitCart } from '../action-creators/cart';
import StripeCheckout from 'react-stripe-checkout';
 

/* -----------------    COMPONENT     ------------------ */

class Stripe extends React.Component {
    constructor(props) {
        super(props);
    }

    onToken (token) {
        fetch('/save-stripe-token', {
        method: 'POST',
        body: JSON.stringify(token),
    })
        .then(response => {
        // console.log("RESPONSE FROM WEIRD FETCH REQ", response)
        response.json()
            .then(data => {
                alert(`We are in business, ${data.email}`);
            });
        });
    }
    
    render(){
        console.log(this.props);
        return (
            <div>
                { 
            //         (this.props.user && this.props.user.name) ? 
            //         (
            //             <button onClick={() => {this.props.submitOrder(this.props.currentCart, this.props.user.id)}} >Checkout with Stripe</button>
            //     ) 
            //     :
            //     (<form onSubmit={(evt) => {evt.preventDefault(); this.props.submitOrder(this.props.currentCart, 1000000)}}>
            //         <p>You\'ve reached stripe checkout page</p>           
            //             <input />
            //             <input />
            //             <button type="submit" >Checkout with Stripe</button>
            //     </form>
            //     )
            // }
                }
            <StripeCheckout
                token={this.onToken}
                stripeKey="pk_test_bPEj4xOuaYUyPkOjv6Om7s46"
                name="DOA"
                ComponentClass="div"
                panelLabel="Something"
                amount={1000000}
                currency="USD"
                locale="zh"
                email="info@vidhub.co"
                // Note: Enabling either address option will give the user the ability to
                // fill out both. Addresses are sent as a second parameter in the token callback.
                shippingAddress
                billingAddress={false}
                // Note: enabling both zipCode checks and billing or shipping address will
                // cause zipCheck to be pulled from billing address (set to shipping if none provided).
                zipCode={false}
                alipay
                bitcoin
                allowRememberMe
                // Note: `reconfigureOnUpdate` should be set to true IFF, for some reason
                // you are using multiple stripe keys
                reconfigureOnUpdate={false}
                // Note: you can change the event to `onTouchTap`, `onClick`, `onTouchStart`
                // useful if you're using React-Tap-Event-Plugin
                triggerEvent="onClick"
                >
                <button className="btn btn-primary">
                    Use your own child component, which gets wrapped in whatever
                    component you pass into as "ComponentClass" (defaults to span)
                </button>
            </StripeCheckout>
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