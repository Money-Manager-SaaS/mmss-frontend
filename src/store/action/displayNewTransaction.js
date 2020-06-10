import * as TYPES from '../action-type';

const displayNewTransaction = {
  display_new_transaction() {
    return {
      type: TYPES.DISPLAY_NEW_TRANSACTION,
    };
  },
};

export default displayNewTransaction;
