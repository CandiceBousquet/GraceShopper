import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cart from '../components/Cart';
import OrderHistory from '../components/OrderHistory';
import { fetchRecentOrder, fetchOrderHistory, removeCart, removeItem, updateSubmitCart } from '../action-creators/cart';

class CartContainer extends Component {
    constructor (props) {
        super(props);
        this.submitOrder = this.submitOrder.bind(this);

    }

    submitOrder (cart, userId) {
        const history = this.props.history;
        this.props.submitOrder(cart, userId, history);
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
        submitOrder: (cart, userId, history) => {
            if (userId) {
                history.push('/payment')
            } else {
                history.push('/checkout')
            }
        }
    };
};

export default connect(mapState, mapDispatch)(CartContainer);
