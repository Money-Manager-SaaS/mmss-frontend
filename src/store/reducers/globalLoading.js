import * as TYPES from '../action-type';

export default function loadingReducer(
  state = {
    globalLoading: false,
  },
  action
) {
  switch (action.type) {
    case TYPES.GLOBAL_LOADING:
      state = JSON.parse(JSON.stringify(state));
      state.globalLoading = action.data;
      break;
    default:
      break;
  }
  return state;
}
