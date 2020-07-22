import * as TYPES from '../action-type';

const ledger = {
  get_ledgers(data) {
    return {
      type: TYPES.GET_LEDGERS,
      data,
    };
  },
  add_ledger(data) {
    return {
      type: TYPES.ADD_LEDGER,
      data,
    };
  },
  delete_ledger(id) {
    return {
      type: TYPES.DELETE_LEDGER,
      id,
    };
  },
  update_ledger(data) {
    return {
      type: TYPES.UPDATE_LEDGER,
      data,
    };
  },
};

export default ledger;
