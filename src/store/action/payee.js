import * as TYPES from '../action-type';

const payee = {
  get_payees(data) {
    return {
      type: TYPES.GET_PAYEES,
      data,
    };
  },
  add_payee(data) {
    return {
      type: TYPES.ADD_PAYEE,
      data,
    };
  },
  delete_payee(id) {
    return {
      type: TYPES.DELETE_PAYEE,
      id,
    };
  },
  update_payee(data) {
    return {
      type: TYPES.UPDATE_PAYEE,
      data,
    };
  },
};

export default payee;
