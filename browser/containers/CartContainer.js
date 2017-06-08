import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cart from '../components/Cart';
import { fetchRecentOrder, fetchOrderHistory } from '../action-creators/cart';

const mapToState = state => {
    return {
        currentCart: state.cart.current,
        cartHistory: state.cart.history
    };
};

// const mapToProps = dispatch => {
//     return {
//       fetchRecentOrder: cartId => {
//         dispatch(fetchRecentOrder(cartId));
//       },
//       fetchOrderHistory: userId => {
//         dispatch(fetchOrderHistory(userId));
//       }
//     };
// };

export default connect(mapToState)(Cart);
