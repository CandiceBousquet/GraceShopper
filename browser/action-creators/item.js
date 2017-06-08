'use-strict';

import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */

const SET_ITEMS = 'SET_ITEMS';
const SET_CURRENT_ITEM = 'SET_CURRENT_ITEM';
const CREATE_ITEM = 'CREATE_ITEM';
const DELETE_ITEM = 'DELETE_ITEM';
const UPDATE_ITEM = 'UPDATE_ITEM';

/* ------------   ACTION CREATORS     ------------------ */

const setItems = items => ({ type: SET_ITEMS, items });
const setCurrentItem = item => ({ type: SET_CURRENT_ITEM, item });
const createItem = item => ({ type: CREATE_ITEM, item });
const deleteItem = item => ({ type: DELETE_ITEM, item });
const updateItem = item => ({ type: UPDATE_ITEM, item });

/* ------------       REDUCER     ------------------ */

const initialState = {
	items: [],
	currentItem: null
};

export default function reducer (state = initialState, action) {
	const newState = Object.assign({}, state); // deep clone?
	switch (action.type) {
		case SET_ITEMS:
			newState.items = action.items;
			break;
	    case SET_CURRENT_ITEM:
			newState.currentItem = action.item;
			break;
	    case CREATE_ITEM:
			newState.items = [action.item, ...newState.items];
			break;
	    case DELETE_ITEM:
			newState.items = newState.filter((item) => item.id !== action.item.id);
			break;
	    case UPDATE_ITEM:
			newState.items.map((item) => {
				return item.id === action.item.id ? action.item : item;
			});
			break;
	    default:
	      return;
	  }
	  return newState;
}

/* ------------       DISPATCHERS     ------------------ */

export const fetchAllItems = () => dispatch => {
	axios.get('/items')
	.then(res => {
		dispatch(setItems(res.data));
	})
	.catch(console.error);
}

export const setSingleItem = (itemId) => dispatch => {
	axios.get(`/items/${itemId}`)
	.then(res => {
		dispatch(setCurrentItem(res.data));
	})
	.catch(console.error);
}

export const createNewItem = (item) => dispatch => {
	axios.post('/items', {item})
	.then(res => {
		dispatch(createItem(res.data));
	})
	.catch(console.error);
}

export const updateItemInDatabase = (item) => dispatch => {
	axios.put(`/items/${item.id}`, {item})
	.then(res => {
		dispatch(updateItem(res.data));
	})
	.catch(console.error);
}

export const removeItem = (itemId) => dispatch => {
	axios.delete(`/items/${itemId}`)
	.then(res => {
		dispatch(deleteItem(res.data));
	})
	.catch(console.error);
}
