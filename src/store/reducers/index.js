import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import transaction from './transaction';
import account from './account';
import category from './category';
const reducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    transaction,
    account,
    category,
  });

export default reducer;
