import * as TYPES from '../action-type';
import { getEmail } from '../../utils';
export default function user(
  state = {
    email: '',
    auth: getEmail() ? true : false,
  },
  action
) {
  state = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case TYPES.CHANGE_AUTH:
      {
        const { data } = action;
        state.email = data.email;
        state.auth = data.auth;
      }
      break;

    default:
      break;
  }
  return state;
}
