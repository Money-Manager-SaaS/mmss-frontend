import React, { useState } from 'react';
import { Form, Input, Select, Row, Col, Checkbox, Button } from 'antd';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { setEmail } from '../../utils';
import action from '@/store/action';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Registe = ({ change_auth }) => {

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [cfmPassword, setCfmPassword] = useState('');

const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const mockLogin = (e) => {
    e.preventDefault();
    change_auth({ email: '39260972@qq.com', auth: true });
    setEmail('39260972@qq.com');
  };
  return (
    <Form {...formItemLayout} form={form} name="register" onFinish={onFinish} scrollToFirstError>
      <Form.Item>
        <h1>Sign Up</h1>
      </Form.Item>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input value={username} onChange={(e) => setUserName(e.target.value)} />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password value={password} onChange={(e) => setPassword(e.target.value)}/>
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject('The two passwords that you entered do not match!');
            },
          }),
        ]}
      >
        <Input.Password value={cfmPassword} onChange={(e) => setCfmPassword(e.target.value)} />
      </Form.Item>
      <Form.Item>
        <Checkbox>
          <a href="">I agree with terms and conditions</a>
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <br />
        <Link to="/login">Already have an account? Sign in here</Link>
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Sign up
        </Button>
      </Form.Item>
      <Button type="primary" htmlType="submit" className="login-form-button" onClick={mockLogin}>
        Mock Register
      </Button>
    </Form>
  );
};

export default connect(null, { change_auth: action.user.change_auth })(Registe);
