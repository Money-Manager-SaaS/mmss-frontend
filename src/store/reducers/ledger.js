import * as TYPES from '../action-type';

export default function ledger(
  state = {
    ledgers: [],
    selectedLedger: null,
  },
  action
) {
  switch (action.type) {
    case TYPES.GET_LEDGERS:
      {
        const { data } = action;
        state = {
          ledgers: data,
          selectedLedger: data.length > 0 ? data[0].id : null,
        };
      }
      break;
    case TYPES.ADD_LEDGER:
      {
        const { data } = action;
        const newLedgers = [...state.ledgers, data];
        state = { ...state, ledgers: newLedgers };
      }
      break;
    case TYPES.DELETE_LEDGER:
      {
        const { id } = action;
        const newLedgers = state.ledgers.filter((item) => item.id !== id);
        state = { ...state, ledgers: newLedgers };
      }
      break;
    case TYPES.UPDATE_LEDGER:
      {
        const { data } = action;
        const newLedgers = state.ledgers.map((item) => (item.id !== data.id ? item : data));
        state = { ...state, ledgers: newLedgers };
      }
      break;
    case TYPES.SELECT_LEDGER:
      {
        const { data } = action;

        state = { ...state, selectedLedger: data };
      }
      break;
    default:
      break;
  }
  return state;
}
