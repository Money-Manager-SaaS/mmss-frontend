import * as TYPES from '../action-type';

const category = {
  get_categories(data) {
    return {
      type: TYPES.GET_CATEGORIES,
      data,
    };
  },

  add_category(data) {
    return {
      type: TYPES.ADD_CATEGORY,
      data,
    };
  },
  delete_category(data) {
    return {
      type: TYPES.DELETE_CATEGORY,
      data,
    };
  },
  update_category(data) {
    return {
      type: TYPES.UPDATE_CATEGORY,
      data,
    };
  },
};

export default category;
