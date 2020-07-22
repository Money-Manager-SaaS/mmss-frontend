import * as TYPES from '../action-type';

export default function ledger(
  state = {
    ledgers: [],
    hasLedgers: false,
  },
  action
) {
  switch (action.type) {
    case TYPES.GET_LEDGERS:
      {
        const { data } = action;
        state = { ledgers: data, hasLedgers: true };
      }
      break;
    case TYPES.ADD_LEDGER:
      {
        const { data } = action;
        const newLedgers = [...state.ledgers, data];
        state = { ledgers: newLedgers };
      }
      break;
    case TYPES.DELETE_LEDGER:
      {
        const { id } = action;
        const newLedgers = state.ledgers.filter((item) => item.id !== id);
        state = { ledgers: newLedgers };
      }
      break;
    case TYPES.UPDATE_LEDGER:
      {
        const { data } = action;
        const newLedgers = state.ledgers.map((item) => (item.id !== data.id ? item : data));
        state = { ledgers: newLedgers };
      }
      break;
    default:
      break;
  }
  return state;
}
