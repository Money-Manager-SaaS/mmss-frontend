import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import transaction from './transaction';
import account from './account';

const reducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    transaction,
    account,
  });

export default reducer;
