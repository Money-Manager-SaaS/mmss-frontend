import * as TYPES from '../action-type';

const transaction = {
  get_transactions(data) {
    return {
      type: TYPES.GET_TRANSACTIONS,
      data,
    };
  },
  add_transaction(data) {
    return {
      type: TYPES.ADD_TRANSACTION,
      data,
    };
  },
  delete_transaction(data) {
    return {
      type: TYPES.DELETE_TRANSACTION,
      data,
    };
  },
  update_transaction(data) {
    return {
      type: TYPES.UPDATE_TRANSACTION,
      data,
    };
  },
};

export default transaction;
