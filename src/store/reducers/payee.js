import * as TYPES from '../action-type';
import { CreateIdNameTable } from '../../utils';

export default function payee(
  state = {
    payees: [],
    payeesTable: {},
  },
  action
) {
  state = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case TYPES.GET_PAYEES:
      {
        const { data } = action;
        state.payees = data;

        state.payeesTable = CreateIdNameTable(data);
      }
      break;
    case TYPES.ADD_PAYEE:
      state.payees.push(action.data);

      break;
    case TYPES.DELETE_PAYEE:
      state.payees = state.payees.filter((item) => item.id !== action.data.id);

      break;
    case TYPES.UPDATE_PAYEE:
      state.payees = state.payees.map((item) =>
        item.id !== action.data.id ? item : { ...item, ...action.data }
      );

      break;
    default:
      break;
  }
  return state;
}
