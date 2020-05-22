import * as TYPES from '../action-type';
import { CreateIdNameTable } from '../../utils';

export default function payee(
  state = {
    payees: [],
    payeesTable: {},
  },
  action
) {
  switch (action.type) {
    case TYPES.GET_PAYEES:
      {
        const { data } = action;
        state = { payees: data, payeesTable: CreateIdNameTable(data) };
      }
      break;
    case TYPES.ADD_PAYEE:
      {
        const { data } = action;
        const newPayees = [...state.payees, data];
        state = { payees: newPayees, payeesTable: CreateIdNameTable(newPayees) };
      }
      break;
    case TYPES.DELETE_PAYEE:
      {
        const { id } = action;
        const newPayees = state.payees.filter((item) => item.id !== id);
        state = { payees: newPayees, payeesTable: CreateIdNameTable(newPayees) };
      }
      break;
    case TYPES.UPDATE_PAYEE:
      {
        const { data } = action;
        const newPayees = state.payees.map((item) => (item.id !== data.id ? item : data));
        state = { payees: newPayees, payeesTable: CreateIdNameTable(newPayees) };
      }
      break;
    default:
      break;
  }
  return state;
}
