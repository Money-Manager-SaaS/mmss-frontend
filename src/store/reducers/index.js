import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import transaction from './transaction';

const reducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    transaction,
  });

export default reducer;
