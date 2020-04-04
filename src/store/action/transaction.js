import * as TYPES from '../action-type';

import { getTransactions } from '../../api/transaction';

const transaction = {
  get_transactions(props) {
    return async (dispatch) => {
      let Data = await getTransactions(props);
      dispatch({
        type: TYPES.GET_TRANSACTIONS,
        Data,
      });
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
