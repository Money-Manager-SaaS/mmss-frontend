import * as TYPES from '../action-type';
import { CreateIdNameTable } from '../../utils';

export default function account(
  state = {
    accounts: [],
    accountsTable: {},
  },
  action
) {
  switch (action.type) {
    case TYPES.GET_ACCOUNTS:
      {
        const { data } = action;
        state = { accounts: data, accountsTable: CreateIdNameTable(data) };
      }
      break;
    case TYPES.ADD_ACCOUNT:
      {
        const { data } = action;
        const newAccounts = [...state.accounts, data];
        state = { accounts: newAccounts, accountsTable: CreateIdNameTable(newAccounts) };
      }
      break;
    case TYPES.DELETE_ACCOUNT:
      {
        const { id } = action;
        const newAccounts = state.accounts.filter((item) => item.id !== id);
        state = { accounts: newAccounts, accountsTable: CreateIdNameTable(newAccounts) };
      }
      break;
    case TYPES.UPDATE_ACCOUNT:
      {
        const { data } = action;
        const newAccounts = state.accounts.map((item) => (item.id !== data.id ? item : data));
        state = { accounts: newAccounts, accountsTable: CreateIdNameTable(newAccounts) };
      }
      break;
    default:
      break;
  }
  return state;
}
