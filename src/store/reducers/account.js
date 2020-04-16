import * as TYPES from '../action-type';

function CreateAccountsTable(accounts) {
  const result = {};
  accounts.forEach((account) => {
    result[account.id] = account.name;
  });
  return result;
}

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
        const { status, data } = action.Data;
        if (status === 200) {
          state.accounts = data.accounts;
          state.accountsTable = CreateAccountsTable(data.accounts);
        }
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
