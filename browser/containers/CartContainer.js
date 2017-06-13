import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cart from '../components/Cart';
import OrderHistory from '../components/OrderHistory';
import { fetchRecentOrder, fetchOrderHistory, removeCart, removeItem, updateSubmitCart, applyCode } from '../action-creators/cart';
import axios from 'axios';

class CartContainer extends Component {
    constructor (props) {
        super(props);
        this.submitOrder = this.submitOrder.bind(this);
        this.applyCouponCodes = this.applyCouponCodes.bind(this)
       

    }

    submitOrder (cart, userId) {
        const history = this.props.history;
        this.props.submitOrder(cart, userId, history);
    }

    applyCouponCodes(event){
        event.preventDefault();
        let couponCode = event.target.user_coupon.value;
        if(this.props.coupons_codes[couponCode]){
            
            alert(`You have applied code: ${couponCode} to your order`)
            this.props.applyDiscount(this.props.coupons_codes[couponCode])
            
        }
    }

    componentDidMount(){
        if (this.props.user.id) {
			this.props.fetchOrderHistory(this.props.user.id);
		}
    }

    render () {
        return (
            <div>
                <Cart currentCart={this.props.currentCart}
                    user={this.props.user}
                    removeCart={this.props.removeCart}
                    removeItem={this.props.removeItem}
                    submitOrder={this.submitOrder}
                    processingOrder={false}
                    coupons_codes = {this.props.coupons_codes}
                    applyCouponCodes = {this.applyCouponCodes}
                    discount = {this.props.discount}
                />
                { this.props.user.id ? <OrderHistory cartHistory={this.props.cartHistory} /> : null }
            </div>
            );
    }

}

const mapState = state => {
    return {
        currentCart: state.cart.current,
        cartHistory: state.cart.history,
        user: state.user,
        coupons_codes:state.cart.coupon_codes,
        discount:state.cart.discount
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
        submitOrder: (cart, userId, history) => {
            if (userId) {
                history.push('/payment')
            } else {
                history.push('/checkout')
            }
        },
        applyDiscount :(coupon) =>{
            dispatch(applyCode(coupon))
        }
    };
};

export default connect(mapState, mapDispatch)(CartContainer);
