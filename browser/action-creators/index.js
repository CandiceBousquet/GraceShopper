import { combineReducers } from 'redux';
import item from './item';
//import cart from './cart';
import user from './login';

export default combineReducers({ item, user });