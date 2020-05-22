import * as TYPES from '../action-type';

export default function transaction(
  state = {
    transactions: [],
  },
  action
) {
  switch (action.type) {
    case TYPES.GET_TRANSACTIONS:
      state = { transactions: action.data };
      break;
    case TYPES.ADD_TRANSACTION:
      state = { transactions: [...state.transactions, action.data] };
      break;
    case TYPES.DELETE_TRANSACTION:
      state = { transactions: state.transactions.filter((item) => item.id !== action.id) };
      break;
    case TYPES.UPDATE_TRANSACTION:
      state = {
        transactions: state.transactions.map((item) =>
          item.id !== action.data.id ? item : action.data
        ),
      };
      break;
    default:
      break;
  }
  return state;
}
