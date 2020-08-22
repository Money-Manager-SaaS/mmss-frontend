import React from 'react';
import { Input, Form, Select, DatePicker } from 'antd';

import moment from 'moment';
import './cell.css';
const { Option } = Select;

export default ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  selectTable,
  ...restProps
}) => {
  const InputNode = () => {
    switch (dataIndex) {
      case 'note':
        return <Input.TextArea style={{ minWidth: 100, maxWidth: 200 }} />;
      case 'amount':
        return <Input type={'number'} style={{ maxWidth: 110 }} />;
      case 'date':
        return (
          <DatePicker allowClear={false} initialValues={moment(new Date())} format="MM/DD/YYYY" />
        );
      default:
        return (
          <Select
            className="search-field"
            style={{ width: '100%' }}
            placeholder={title}
            optionLabelProp="label"
          >
            {title === 'TO' ||
              (title === 'PAYEE' && (
                <Option value={''} label={''}>
                  {''}
                </Option>
              ))}
            {Object.keys(selectTable).map((key, index) => (
              <Option key={index} value={Number(key)} label={selectTable[key]}>
                {selectTable[key]}
              </Option>
            ))}
          </Select>
        );
    }
  };

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
            padding: 0,
            width: '100%',
          }}
          rules={[
            {
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {InputNode()}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
