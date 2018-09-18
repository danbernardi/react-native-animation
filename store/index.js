import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './reducers';

const appReducer = combineReducers(reducers);

const middleware = [thunk];

export default createStore(appReducer, composeWithDevTools(applyMiddleware(...middleware)));
