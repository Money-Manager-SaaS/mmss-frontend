import React, { Component, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import action from '@/store/action';
import { setEmail } from '../../utils';

const Login = ({ change_auth }) => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const mockLogin = (e) => {
    e.preventDefault();
    change_auth({ email: '39260972@qq.com', auth: true });
    setEmail('39260972@qq.com');
  };
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item>
        <h1>Sign In</h1>
      </Form.Item>
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your name or Email!' }]}
      >
        <p>Username/Email</p>
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
          onChange={(e) => setUserName(e.target.value)}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <p>Password</p>
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Item>

      <Form.Item>
        <Link to="/register">Haven't registed yet? sign now</Link>
        <br />
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form.Item>
      <Button type="primary" htmlType="submit" className="login-form-button" onClick={mockLogin}>
        Mock Login
      </Button>
      {username}
    </Form>
  );
};

export default connect(null, { change_auth: action.user.change_auth })(Login);
