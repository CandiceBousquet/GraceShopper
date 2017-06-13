import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';
import Main from './containers/Main';
import ItemsContainer from './containers/ItemsContainer';
import SingleItemContainer from './containers/SingleItemContainer';
import Login from './containers/Login';
import Signup from './containers/Signup';
import CartContainer from './containers/CartContainer';
import OrderConfirmation from './components/OrderConfirmation';
import { fetchAllItems, fetchSingleItem } from './action-creators/item';
import { fetchRecentOrder, fetchOrderHistory } from './action-creators/cart';
import CheckoutContainer from './containers/Checkout';
import StripeCheckout from './components/StripeCheckout';


const Routes = ({user, cart, fetchCartInformation, fetchCurrentItem, fetchInitialData}) => {
	return (
		<Router history={browserHistory}>
			<Route path='/' component={Main} onEnter={ function () { fetchInitialData(user.id) }} >
				<IndexRoute component={ItemsContainer} />
				<Route path='/login' component={Login} />
				<Route path='/signup' component={Signup} />
				<Route path='/items' component={ItemsContainer}>
					<Route path=':categoryId' component={ItemsContainer} />
				</Route>
				<Route path='/item/:itemId' component={SingleItemContainer} onEnter={fetchCurrentItem}/>
				<Route path='/cart' component={CartContainer} onEnter={ function () { fetchCartInformation(user.id) }} />
				<Route path='/success' component={OrderConfirmation} />
				<Route path='/checkout' component={CheckoutContainer} />
				<Route path='/payment' component={StripeCheckout} />
				<Route path="/*" component={ItemsContainer} />
			</Route>
		</Router>
	);
}


/* -----------------    CONTAINER     ------------------ */

const mapToState = state => {
	return {
		cart: state.cart,
		user: state.user
	}
};


const mapDispatch = dispatch => ({
	fetchInitialData: (userId, nextState) => {
		dispatch(fetchAllItems());
		dispatch(fetchRecentOrder()); // this uses the session.orderId

	},
	fetchCurrentItem: (nextState) => {
		const itemId = nextState.params.itemId;
		dispatch(fetchSingleItem(itemId));
	},
  	fetchCartInformation: (userId, nextState) => {
    	dispatch(fetchRecentOrder()); // this uses the session.orderId
    	if (userId) {
    		dispatch(fetchOrderHistory(userId));
    	}
    }
});

export default connect(mapToState, mapDispatch)(Routes);

