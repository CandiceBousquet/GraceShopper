import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cart from '../components/Cart';
import { fetchRecentOrder, fetchOrderHistory, removeItem, updateSubmitCart } from '../action-creators/cart';


const mapState = state => {
    return {
        currentCart: state.cart.current,
        cartHistory: state.cart.history
    };
};

const mapDispatch = dispatch => {
    return {
      removeItem: itemId => {
          dispatch(removeItem(itemId))
      },
      submitOrder: itemId => {
          dispatch(updateSubmitCart(itemId))
      }
    };
};

export default connect(mapState, mapDispatch)(Cart);
