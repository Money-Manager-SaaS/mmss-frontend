import React from 'react';
import renderer from 'react-test-renderer';
import ConnectedUserInfo, { UserInfo } from './UserInfo';
import { MemoryRouter } from 'react-router';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';

configure({ adapter: new Adapter() });

import configureStore from 'redux-mock-store';


describe('UserInfo render', () => {
  test('pure jest user info snapshot render without redux status', () => {
    const testComp = renderer.create(
      <MemoryRouter>
        <UserInfo email={'a@a.com'} change_auth={() => {
        }}/>
      </MemoryRouter>
    );
    const tree = testComp.toJSON();
    expect(tree).toMatchSnapshot();
  });
});


describe('connected user info with provider', () => {
  const initialState = {
    user: {
      email: 'a@a.com',
      change_auth: () => {
      }
    }
  };
  const mockStore = configureStore();
  let store, wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('check email from store', () => {
    wrapper = mount(<Provider store={store}><MemoryRouter><ConnectedUserInfo/></MemoryRouter></Provider>);
    expect(wrapper.find(UserInfo).prop('email')).toEqual(initialState.user.email);
  });
});
