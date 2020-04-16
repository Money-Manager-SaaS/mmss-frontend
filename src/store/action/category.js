import * as TYPES from '../action-type';

import { getCategories } from '../../api/category';

const category = {
  get_categories(props) {
    return async (dispatch) => {
      let Data = await getCategories(props);
      dispatch({
        type: TYPES.GET_CATEGORIES,
        Data,
      });
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
