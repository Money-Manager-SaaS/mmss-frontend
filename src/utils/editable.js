import React, { useState } from 'react';
import { Input, Form, Select } from 'antd';
const { Option } = Select;

export const EditableCell = ({
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
  const [value, setValue] = useState();

  function onChange(value) {
    setValue(value);
  }

  const inputNode =
    inputType === 'select' ? (
      <Select
        className="search-field"
        style={{ minWidth: 80 }}
        placeholder="Select Categories"
        value={value}
        onChange={onChange}
        optionLabelProp="label"
      >
        {Object.keys(selectTable).map((key, index) => (
          <Option key={index} value={key} label={selectTable[key]}>
            {selectTable[key]}
          </Option>
        ))}
      </Select>
    ) : (
      <Input style={{ maxWidth: 100 }} />
    );
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
