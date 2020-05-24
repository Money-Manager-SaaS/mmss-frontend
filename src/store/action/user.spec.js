import user_action from './user';
import * as types from '../action-type';

describe('actions', () => {
  it('should create an action to add a todo', () => {
    const expectedAction1 = {
      type: types.CHANGE_AUTH,
      data: false
    };
    expect(user_action.change_auth(false)).toEqual(expectedAction1);
    const expectedAction2 = {
      type: types.CHANGE_AUTH,
      data: true
    };
    expect(user_action.change_auth(true)).toEqual(expectedAction2);
  });
});
