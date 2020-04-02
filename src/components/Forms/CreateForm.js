import React from 'react';
import { Modal, Radio, Form, Select, InputNumber, Input, Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import './CreateForm.css';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export default function CreateForm(props) {
  return (
    <Modal
      title="Create Transaction"
      visible={props.visible}
      onOk={props.handleOK}
      onCancel={props.handleCancel}
    >
      <Form {...layout}>
        <Form.Item label="Type" name="">
          <Radio.Group defaultValue="withdraw">
            <Radio value="withdraw">Withdraw</Radio>
            <Radio value="transfer">Transfer</Radio>
            <Radio value="desposit">Desposit</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Select account" name="">
          <Select defaultValue="ANZ" style={{ width: 160 }}>
            <Option value="ANZ">ANZ</Option>
            <Option value="Cash">Cash</Option>
            <Option value="Alipay">Alipay</Option>
            <Option value="Kiwibank">Kiwibank</Option>
          </Select>
        </Form.Item>

        <Form.Item label="To" name="">
          <Select defaultValue="ANZ" style={{ width: 160 }}>
            <Option value="ANZ">ANZ</Option>
            <Option value="Cash">Cash</Option>
            <Option value="Alipay">Alipay</Option>
            <Option value="Kiwibank">Kiwibank</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Amount" name="">
          <InputNumber
            defaultValue={0}
            formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
          />
        </Form.Item>
        <Form.Item label="Payee" name="">
          <Space>
            <Input style={{ width: 160 }} />
            <Button type="primary" shape="circle" icon={<PlusOutlined />} />
          </Space>
        </Form.Item>
        <Form.Item label="Category" name="">
          <Space>
            <Input style={{ width: 160 }} />
            <Button type="primary" shape="circle" icon={<PlusOutlined />} />
          </Space>
        </Form.Item>
        <Form.Item label="Note" name="">
          <Input.TextArea rows={3} style={{ width: 160 }} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
