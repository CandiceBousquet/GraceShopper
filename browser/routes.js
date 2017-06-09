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
import { fetchAllItems } from './action-creators/item';

const Routes = ({ fetchInitialData }) => {
	return (
		<Router history={browserHistory}>
			<Route path='/' component={Main} onEnter={ fetchInitialData } >
				<IndexRoute component={ItemsContainer} />
				<Route path='/login' component={Login} />
				<Route path='/signup' component={Signup} />
				<Route path='/items' component={ItemsContainer}>
					<Route path=':categoryId' component={ItemsContainer} />
				</Route>
				<Route path='/item/:itemId' component={SingleItemContainer} />
				<Route path='/:userId/cart' component={CartContainer} />
				<Route path='/:orderId/success' component={OrderConfirmation} />
				<Route path="*" component={ItemsContainer} />
			</Route>
		</Router>
	);
}


/* -----------------    CONTAINER     ------------------ */

const mapProps = null;

const mapDispatch = dispatch => ({
	fetchInitialData: () => {
		dispatch(fetchAllItems());
	}
});

// export default Routes;

export default connect(mapProps, mapDispatch)(Routes);
