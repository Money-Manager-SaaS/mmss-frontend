import * as TYPES from '../action-type';
import { CreateIdNameTable } from '../../utils';

export default function category(
  state = {
    categories: [],
    categoriesTable: {},
  },
  action
) {
  state = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case TYPES.GET_CATEGORIES:
      {
        const { data } = action;
        state.categories = data;
        state.categoriesTable = CreateIdNameTable(data);
      }
      break;
    case TYPES.ADD_CATEGORY:
      state.categories.push(action.data);

      break;
    case TYPES.DELETE_CATEGORY:
      state.categories = state.categories.filter((item) => item.id !== action.data.id);

      break;
    case TYPES.UPDATE_CATEGORY:
      state.categories = state.categories.map((item) =>
        item.id !== action.data.id ? item : { ...item, ...action.data }
      );
      break;
    default:
      break;
  }
  return state;
}
