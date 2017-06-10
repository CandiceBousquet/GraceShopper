import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Main from './containers/Main';
import ItemsContainer from './containers/ItemsContainer';
import SingleItemContainer from './containers/SingleItemContainer';
import Login from './containers/Login';
import Signup from './containers/Signup';
import CartContainer from './containers/CartContainer';
import OrderConfirmation from './components/OrderConfirmation';
import { fetchAllItems, fetchSingleItem } from './action-creators/item';
import { fetchRecentOrder, fetchOrderHistory } from './action-creators/cart';

const Routes = ({ fetchInitialData, fetchCurrentItem, fetchCartInformation }) => {

	return (
		<Router history={browserHistory}>
			<Route path='/' component={Main} onEnter={fetchInitialData} >
				<IndexRoute component={ItemsContainer} />
				<Route path='/login' component={Login} />
				<Route path='/signup' component={Signup} />
				<Route path='/items' component={ItemsContainer}>
					<Route path=':categoryId' component={ItemsContainer} />
				</Route>
				<Route path='/item/:itemId' component={SingleItemContainer} onEnter={fetchCurrentItem}/>
				<Route path='/cart' component={CartContainer} onEnter={fetchCartInformation} />
				<Route path='/:orderId/success' component={OrderConfirmation} />
				<Route path="*" component={ItemsContainer} />
			</Route>
		</Router>
	);
}


/* -----------------    CONTAINER     ------------------ */

const mapToState = state => ({});



const mapDispatch = dispatch => ({
	fetchInitialData: () => {
		dispatch(fetchAllItems());
		dispatch(fetchRecentOrder());
	  	dispatch(fetchOrderHistory(1));
	},
	fetchCurrentItem: (nextState) => {
		const itemId = nextState.params.itemId;
		dispatch(fetchSingleItem(itemId));
	},
  fetchCartInformation: nextRouterState => {
		//const userId = nextRouterState.params.userId;
      dispatch(fetchRecentOrder());
	  dispatch(fetchOrderHistory(4));
    }
});

export default connect(mapToState, mapDispatch)(Routes);

