import newTransactionIndex from './displayNewTransaction';
import * as types from '../action-type';
import { configure, mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';

import configureStore from 'redux-mock-store';

configure({ adapter: new Adapter() });

describe('actions', () => {
  const initialState = {
    newTransactionIndex: {
      newTransIndex: 0,
    }
  },
  mockStore = configureStore();
  let store;
  let wrapper;
  let NewTransIndexBindedComponent;
  
  function NewTransIndexComponent({index}) {
    return (
      <div className="here">
        {index}
      </div>
    );
  }    

  beforeEach(() => {
    store = mockStore(initialState);
    NewTransIndexBindedComponent = connect((state) => ({ index: state.newTransactionIndex.newTransIndex }))(NewTransIndexComponent);
  });


  it('newTransIndex increse to 1', () => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <NewTransIndexBindedComponent />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find(NewTransIndexComponent).prop('index')).toEqual(initialState.newTransactionIndex.newTransIndex);
  });
});
