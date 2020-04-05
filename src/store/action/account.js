import * as TYPES from '../action-type';

import { getAccounts } from '../../api/account';

const account = {
  get_accounts(props) {
    return async (dispatch) => {
      let Data = await getAccounts(props);
      dispatch({
        type: TYPES.GET_ACCOUNTS,
        Data,
      });
    };
  },
  add_account(data) {
    return {
      type: TYPES.ADD_ACCOUNT,
      data,
    };
  },
  delete_account(data) {
    return {
      type: TYPES.DELETE_ACCOUNT,
      data,
    };
  },
  update_account(data) {
    return {
      type: TYPES.UPDATE_ACCOUNT,
      data,
    };
  },
};

export default account;
