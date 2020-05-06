import React from 'react';
import { Radio, Form, Select, InputNumber, Input, Button, Space, DatePicker, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment';

import './CreateForm.css';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export default function CreateForm() {
  return (
    <Form {...layout}>
      <Form.Item label="Date" name="date">
        <DatePicker initialValues={moment(new Date())} format="MM/DD/YYYY" />
      </Form.Item>
      <Form.Item label="Type" name="type">
        <Radio.Group initialValues="withdraw">
          <Radio value="withdraw" className="select-radio">
            Withdraw
          </Radio>
          <Radio value="transfer" className="select-radio">
            Transfer
          </Radio>
          <Radio value="desposit" className="select-radio">
            Desposit
          </Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Account" name="account">
        <Select style={{ width: 140 }} defaultValue="ANZ">
          <Select.Option value="ANZ">ANZ</Select.Option>
          <Select.Option value="Cash">Cash</Select.Option>
          <Select.Option value="Alipay">Alipay</Select.Option>
          <Select.Option value="Kiwibank">Kiwibank</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="To" name="to">
        <Select style={{ width: 140 }} defaultValue="ANZ">
          <Select.Option value="ANZ">ANZ</Select.Option>
          <Select.Option value="Cash">Cash</Select.Option>
          <Select.Option value="Alipay">Alipay</Select.Option>
          <Select.Option value="Kiwibank">Kiwibank</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Amount" name="amount">
        <InputNumber
          initialValues={0}
          formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
        />
      </Form.Item>
      <Form.Item label="Payee" name="payee">
        <Select
          showSearch
          style={{ width: 140 }}
          placeholder="Search payee"
          dropdownRender={(menu) => (
            <div>
              {menu}
              <Divider style={{ margin: '4px 0' }} />
              <Space style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                <Input style={{ width: 80 }} />
                <Button type="primary" shape="circle" icon={<PlusOutlined />} />
              </Space>
            </div>
          )}
        ></Select>
      </Form.Item>
      <Form.Item label="Category" name="category">
        <Select
          showSearch
          style={{ width: 140 }}
          placeholder="Search category"
          dropdownRender={(menu) => (
            <div>
              {menu}
              <Divider style={{ margin: '4px 0' }} />
              <Space style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                <Input style={{ width: 80 }} />
                <Button type="primary" shape="circle" icon={<PlusOutlined />} />
              </Space>
            </div>
          )}
        ></Select>
      </Form.Item>
      <Form.Item label="Note" name="note">
        <Input.TextArea rows={3} style={{ width: 160 }} />
      </Form.Item>
    </Form>
  );
}
