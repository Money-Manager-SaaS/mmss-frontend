import * as TYPES from '../action-type';
import { getRefreshToken } from 'utils';
export default function user(
  state = {
    email: '',
    refreshToken: getRefreshToken(),
    accessToken: undefined,
  },
  action
) {
  switch (action.type) {
    case TYPES.CHANGE_AUTH:
      {
        const { data } = action;
        state = {
          ...state,
          email: data.email,
          refreshToken: data.refreshToken,
        };
      }
      break;

    default:
      break;
  }
  return state;
}
