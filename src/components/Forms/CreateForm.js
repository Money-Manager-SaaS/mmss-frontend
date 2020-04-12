import React from 'react';
import { Modal, Radio, Form, Select, InputNumber, Input, Button, Space, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment';

import './CreateForm.css';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export default function CreateForm({ visible, handleOK, handleCancel }) {
  return (
    <Modal title="Create Transaction" visible={visible} onOk={handleOK} onCancel={handleCancel}>
      <Form {...layout}>
        <Form.Item label="Date" name="date">
          <DatePicker defaultValue={moment(new Date())} format="MM/DD/YYYY" />
        </Form.Item>
        <Form.Item label="Type" name="type">
          <Radio.Group defaultValue="withdraw">
            <Radio value="withdraw">Withdraw</Radio>
            <Radio value="transfer">Transfer</Radio>
            <Radio value="desposit">Desposit</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Select account" name="account">
          <Select defaultValue="ANZ" style={{ width: 160 }}>
            <Select.Option value="ANZ">ANZ</Select.Option>
            <Select.Option value="Cash">Cash</Select.Option>
            <Select.Option value="Alipay">Alipay</Select.Option>
            <Select.Option value="Kiwibank">Kiwibank</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="To" name="to">
          <Select defaultValue="ANZ" style={{ width: 160 }}>
            <Select.Option value="ANZ">ANZ</Select.Option>
            <Select.Option value="Cash">Cash</Select.Option>
            <Select.Option value="Alipay">Alipay</Select.Option>
            <Select.Option value="Kiwibank">Kiwibank</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Amount" name="amount">
          <InputNumber
            defaultValue={0}
            formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
          />
        </Form.Item>
        <Form.Item label="Payee" name="payee">
          <Space>
            <Input style={{ width: 160 }} />
            <Button type="primary" shape="circle" icon={<PlusOutlined />} />
          </Space>
        </Form.Item>
        <Form.Item label="Category" name="category">
          <Space>
            <Input style={{ width: 160 }} />
            <Button type="primary" shape="circle" icon={<PlusOutlined />} />
          </Space>
        </Form.Item>
        <Form.Item label="Note" name="note">
          <Input.TextArea rows={3} style={{ width: 160 }} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
