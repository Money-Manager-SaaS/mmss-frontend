import * as TYPES from '../action-type';

const user = {
  change_auth(data) {
    return {
      type: TYPES.CHANGE_AUTH,
      data,
    };
  },
};

export default user;
