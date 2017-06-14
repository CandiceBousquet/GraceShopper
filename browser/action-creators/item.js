'use-strict';

import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */

const SET_ITEMS = 'SET_ITEMS';
const SET_CURRENT_ITEM = 'SET_CURRENT_ITEM';
const CREATE_ITEM = 'CREATE_ITEM';
const DELETE_ITEM = 'DELETE_ITEM';
const UPDATE_ITEM = 'UPDATE_ITEM';
const ADD_REVIEW = 'ADD_REVIEW';

/* ------------   ACTION CREATORS     ------------------ */

const setItems = items => ({ type: SET_ITEMS, items });
const setCurrentItem = item => ({ type: SET_CURRENT_ITEM, item });
const createItem = item => ({ type: CREATE_ITEM, item });
const deleteItem = itemId => ({ type: DELETE_ITEM, itemId });
const updateItem = item => ({ type: UPDATE_ITEM, item });
const addReviewToItem = (item) => ({ type: ADD_REVIEW, item})

/* ------------       REDUCER     ------------------ */

const initialState = {
    items: [],
    currentItem: []
};

export default function reducer(state = initialState, action) {
    const newState = Object.assign({}, state);
    switch (action.type) {
        case SET_ITEMS:
            newState.items = action.items;
            break;
        case SET_CURRENT_ITEM:
        case ADD_REVIEW:
            newState.currentItem = action.item;
            break;
        case CREATE_ITEM:
            newState.items = [action.item, ...newState.items];
            break;
        case DELETE_ITEM:
            newState.items = newState.items.filter((item) => {
                console.log(item.id, action.itemId);
                return item.id !== action.itemId
            });
            break;
        case UPDATE_ITEM:
            newState.items.map((item) => {
                return item.id === action.item.id ? action.item : item;
            });
            break;
        default:
            break;
    }
    return newState;
}

/* ------------       DISPATCHERS     ------------------ */

export const fetchAllItems = () => dispatch => {
	axios.get('/api/items')
	.then(res => {
		dispatch(setItems(res.data));
	})
	.catch(console.error);
}

export const fetchSingleItem = (itemId) => dispatch => {
	axios.get(`/api/items/${itemId}`)
	.then(res => {
		dispatch(setCurrentItem(res.data));
	})
	.catch(console.error);
}

export const createNewItem = (item) => dispatch => {
	axios.post('/api/items', item)
	.then(res => {
		dispatch(createItem(res.data));
	})
	.catch(console.error);
}

export const updateItemInDatabase = (item) => dispatch => {
	axios.put(`/api/items/${item.id}`, item)
	.then(res => {
		dispatch(updateItem(res.data));
	})
	.catch(console.error);
}

export const removeItem = (itemId) => dispatch => {
	axios.delete(`/api/items/${itemId}`)
	.then(res => {
		dispatch(deleteItem(+res.data));
	})
	.catch(console.error);
}

export const addReview = (review, item) => dispatch => {
    axios.post(`/api/items/${item.id}/review`, review)
        .then(res => {
            dispatch(addReviewToItem(res.data))
        })
        .catch(console.error)
}