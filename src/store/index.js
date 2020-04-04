import { createStore, applyMiddleware } from 'redux';
//import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import reducer from './reducers/index';
import reduxThunk from 'redux-thunk';
import reduxPromise from 'redux-promise';

const history = createBrowserHistory();
const store = createStore(reducer(history), applyMiddleware(reduxThunk, reduxPromise));

export default store;
