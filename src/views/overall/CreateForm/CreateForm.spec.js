import React from 'react';
import { Select } from 'antd';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


describe('CreateForm', () => {
  const typesTable = { '-1': 'Withdraw', '0': 'Transfer', '1': 'Deposit' };
  let wrapper;

  function SelectTesting({index}) {
    return (
      <Select
      className="search-field"
      placeholder="types"
      optionLabelProp="label"
    >
      {Object.keys(typesTable).map((key, index) => (
        <Select.Option key={index} value={Number(key)} label={typesTable[key]}>
          {typesTable[key]}
        </Select.Option>
      ))}
    </Select>
    );
  }    

  const map123 = {};

  
  it('test select', () => {
    wrapper = mount(
      <SelectTesting/>
    );
    wrapper.addEventListener = jest.fn((event, cb) => {
      map123[event] = cb;
    });
    map123.keyup({ key: 'Enter' });
    expect(wrapper.handleEnterKey).toHaveBeenCalled();
  });

});
