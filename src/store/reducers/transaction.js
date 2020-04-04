import * as TYPES from '../action-type';

export default function transaction(
  state = {
    transactions: [],
  },
  action
) {
  state = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case TYPES.GET_TRANSACTIONS:
      {
        const { status, data } = action.Data.data;
        if (status === 200) {
          state.transactions = data;
        }
      }
      break;
    case TYPES.ADD_TRANSACTION:
      state.transactions.push(action.data);

      break;
    case TYPES.DELETE_TRANSACTION:
      state.transactions = state.transactions.filter((item) => item.id !== action.data.id);

      break;
    case TYPES.UPDATE_TRANSACTION:
      state.transactions = state.transactions.map((item) =>
        item.id !== action.data.id ? item : { ...item, ...action.data }
      );

      break;
    default:
      break;
  }
  return state;
}
