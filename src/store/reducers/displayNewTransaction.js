import * as TYPES from '../action-type';

export default function newTransactionIndex(
  state = {
    newTransIndex: 0,
  },
  action
) {
  state = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case TYPES.DISPLAY_NEW_TRANSACTION:
      {
        state.newTransIndex = state.newTransIndex + 1;
      }
      break;
    default:
      break;
  }
  return state;
}
