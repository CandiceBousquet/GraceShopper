import { combineReducers } from 'redux';
import item from './item';
import cart from './cart';
import login from './login';

export default combineReducers({ item, cart, login });
