import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import account from './account';
import category from './category';
import user from './user';
import payee from './payee';
import globalLoading from './globalLoading';

import { reducer as toastrReducer } from 'react-redux-toastr';
const reducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    account,
    category,
    user,
    payee,
    globalLoading,
    toastr: toastrReducer,
  });

export default reducer;
