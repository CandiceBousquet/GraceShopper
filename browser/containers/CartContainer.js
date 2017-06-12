import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import { connect } from 'react-redux';
import Cart from '../components/Cart';
import { fetchRecentOrder, fetchOrderHistory, removeCart, removeItem, updateSubmitCart } from '../action-creators/cart';

class CartContainer extends Component {
    constructor (props) {
        super(props);
    }

    componentDidMount(){
        if (this.props.user.id) {
			this.props.fetchOrderHistory(this.props.user.id);
		}
    }

    render () {
        return (<Cart currentCart={this.props.currentCart}
            cartHistory={this.props.cartHistory}
            user={this.props.user}
            removeCart={this.props.removeCart}
            removeItem={this.props.removeItem}
            submitOrder={this.props.submitOrder}
          />);
    }

}

const mapState = state => {
    return {
        currentCart: state.cart.current,
        cartHistory: state.cart.history,
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
        fetchOrderHistory: (id) =>{
            dispatch(fetchOrderHistory(id))
        },
        submitOrder: (cart, userId) => {
            if (userId) {
                alert('Your order has been submitted (Tracking number: ' + cart.id +')');
                dispatch(updateSubmitCart(cart.id, userId));
            } else {
            // direct user to the login page
                browserHistory.push('/login');
            }
        }
    };
};

export default connect(mapState, mapDispatch)(CartContainer);
