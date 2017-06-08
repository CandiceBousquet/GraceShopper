import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */

const ADD_ITEM_AND_FIND_OR_CREATE_CART = 'ADD_ITEM_AND_FIND_OR_CREATE_CART';
const DELETE_ITEM_FROM_CART = 'DELETE_ITEM_FROM_CART';
const DELETE_CART = 'DELETE_CART';
const SUBMIT_CART = 'SUBMIT_CART';

/* -----------------    ACTION CREATORS     ------------------ */

const addToFoundOrCreatedCart = updatedCart => ({ type: ADD_ITEM_AND_FIND_OR_CREATE_CART, updatedCart });

const deleteFromCart = updatedCart => ({ type: DELETE_ITEM_FROM_CART, updatedCart });

const deleteCart = cartId => ({ type: DELETE_CART, cartId });

const submitCart = cartId => ({ type: SUBMIT_CART, cartId });

/* ------------       REDUCERS     ------------------ */

const initialState = {
  cart: {}
};

export default function reducer (state = initialState, action) {
    const newState = Object.assign({}, state);
    switch (action.type) {

        case ADD_ITEM_AND_FIND_OR_CREATE_CART:
            newState.cart = action.updatedCart;
            return newState;

        case DELETE_ITEM_FROM_CART:
            newState.cart = action.updatedCart;
            return newState;

        case DELETE_CART:
            newState.cart = {};
            return newState;

        case SUBMIT_CART:
            newState.cart = {};
            return newState;

        default:
            return newState;
    }
}

/* ------------       DISPATCHERS     ------------------ */

export const addItem = itemId => dispatch => {
    axios.post(`/api/cart/${itemId}`)
        .then(res => dispatch(addToFoundOrCreatedCart(res.data)))
        .catch(err => console.error('Adding item unsuccessful', err));
};

export const removeItem = itemId => dispatch => {
    axios.delete(`/api/cart/${itemId}`)
        .then(res => dispatch(deleteFromCart(res.data)))
        .catch(err => console.error('Deleting item unsuccessful', err));
};

export const removeCart = cartId => dispatch => {
    axios.delete(`/api/cart/${cartId}`)
        .then(res => dispatch(deleteCart(res.data)))
        .catch(err => console.error('Deleting cart unsuccessful', err));
};

export const updateSubmitCart = cartId => dispatch => {
    axios.put(`/api/cart/${cartId}`)
        .then(res => dispatch(submitCart(res.data)))
        .catch(err => console.error('Submitting cart unsuccessful', err));
};
