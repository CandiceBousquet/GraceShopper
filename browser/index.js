import React from 'react';
import ReactDOM from 'react-dom';
import Main from './containers/main';

import store from './store';
import { Provider } from 'react-redux';

import '../public/index.scss';

ReactDOM.render(
	<Provider store={ store } >
	{ Main }
	</Provider>,
	document.getElementById('app'));
