'use-strict';

import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */

const SET_CURRENT_USER = 'SET_CURRENT_USER';
const CREATE_USER = 'CREATE_USER';

/* ------------   ACTION CREATORS     ------------------ */

const setUser = user => ({ type: SET_CURRENT_USER, user });
const createUser = user => ({ type: CREATE_USER, user });

/* ------------       REDUCER     ------------------ */

const initialState = {};

export default function reducer (user = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return action.user;
    case CREATE_USER:
      return action.user;
    default:
      return user;
  }
}

/* ------------       DISPATCHERS     ------------------ */

export const createUserSession = (email, password) => dispatch => {
  axios.post(`/login`, {email, password})
    .then(res => {
      console.log(res);
      dispatch(setUser(res.data))
    })
    .catch(console.error);
}

export const createNewUser = (email, password) => dispatch => {
  axios.post(`/signup`, {email, password})
    .then(res => {
      console.log(res);
      dispatch(setUser(res.data))
    })
    .catch(console.error);
}