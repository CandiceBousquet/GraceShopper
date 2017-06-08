import { createStore, applyMiddleware } from 'redux';
import reducer from './action-creators';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(reducer,
    composeWithDevTools(applyMiddleware(
        createLogger(),
        thunkMiddleware
    ))
);

export default store;