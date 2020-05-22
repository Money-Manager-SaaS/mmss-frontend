import * as TYPES from '../action-type';
import { CreateIdNameTable } from '../../utils';

export default function category(
  state = {
    categories: [],
    categoriesTable: {},
  },
  action
) {
  switch (action.type) {
    case TYPES.GET_CATEGORIES:
      {
        const { data } = action;
        state = { categories: data, categoriesTable: CreateIdNameTable(data) };
      }
      break;
    case TYPES.ADD_CATEGORY:
      {
        const { data } = action;
        const newCategories = [...state.categories, data];
        state = { categories: newCategories, categoriesTable: CreateIdNameTable(newCategories) };
      }
      break;
    case TYPES.DELETE_CATEGORY:
      {
        const { id } = action;
        const newCategories = state.categories.filter((item) => item.id !== id);
        state = { categories: newCategories, categoriesTable: CreateIdNameTable(newCategories) };
      }
      break;
    case TYPES.UPDATE_CATEGORY:
      {
        const { data } = action;
        const newCategories = state.categories.map((item) => (item.id !== data.id ? item : data));
        state = { categories: newCategories, categoriesTable: CreateIdNameTable(newCategories) };
      }
      break;
    default:
      break;
  }
  return state;
}
