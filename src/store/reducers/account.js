import * as TYPES from '../action-type';
import { CreateIdNameTable } from '../../utils';

export default function account(
  state = {
    accounts: [],
    accountsTable: {},
  },
  action
) {
  state = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case TYPES.GET_ACCOUNTS:
      {
        const { data } = action;
        state.accounts = data;
        state.accountsTable = CreateIdNameTable(data);
      }
      break;
    case TYPES.ADD_ACCOUNT:
      state.accounts.push(action.data);

      break;
    case TYPES.DELETE_ACCOUNT:
      state.accounts = state.accounts.filter((item) => item.id !== action.data.id);

      break;
    case TYPES.UPDATE_ACCOUNT:
      state.accounts = state.accounts.map((item) =>
        item.id !== action.data.id ? item : { ...item, ...action.data }
      );

      break;
    default:
      break;
  }
  return state;
}
