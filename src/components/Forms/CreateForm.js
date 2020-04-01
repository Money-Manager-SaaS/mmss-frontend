import React from 'react';
import { Modal } from 'antd';
import './CreateForm.css';

export default function CreateForm(props) {
  return (
    <Modal
      title="Create Transaction"
      visible={props.visible}
      onOk={props.handleOK}
      onCancel={props.handleCancel}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
}
