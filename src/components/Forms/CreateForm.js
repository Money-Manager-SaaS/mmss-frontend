import React from 'react';
import { Modal } from 'antd';

export default function CreateForm(props) {
  return (
    <Modal
      className="form"
      title="Basic Modal"
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
