import * as TYPES from '../action-type';

const account = {
  get_accounts(data) {
    return {
      type: TYPES.GET_ACCOUNTS,
      data,
    };
  },
  add_account(data) {
    return {
      type: TYPES.ADD_ACCOUNT,
      data,
    };
  },
  delete_account(id) {
    return {
      type: TYPES.DELETE_ACCOUNT,
      id,
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
