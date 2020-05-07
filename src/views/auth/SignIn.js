import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import action from '@/store/action';
import { setEmail } from '../../utils';

import { Form, Input, Button, Row, Col, Typography, Divider } from 'antd';
import signLogo from '@/assets/images/sign-logo.png';
import smallLogo from '@/assets/images/mini-logo.png';
import './Sign.css';

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
    <>
      <Row>
        <Col className="left-section" md={12}>
          <Typography className="app-name">MM CLOUD</Typography>
          <img src={signLogo} alt="mmcloud" className="app-logo" />
        </Col>
        <Col className="right-section" xs={24} sm={24} md={12}>
          <Form
            name="normal_login"
            className="sign-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <div className="mobile-logo">
              <img src={smallLogo} alt="mmcloud" className="small-logo" />
              <span className="mobile-title">MM Cloud</span>
            </div>
            <Form.Item>
              <Typography className="sign-title">SIGN IN</Typography>
              <Divider className="divider" />
            </Form.Item>
            <Form.Item
              value={username}
              name="username"
              rules={[{ required: true, message: 'Please input your name or Email!' }]}
            >
              <Typography className="item-label">Username/Email</Typography>
              <Input
                className="text-field"
                placeholder="Username"
                onChange={(e) => setUserName(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              value={password}
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Typography className="item-label">Password</Typography>
              <Input
                className="text-field"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>

            <Form.Item className="description">
              <Link to="/register">Haven't registed yet? Sign up now</Link>
              <Button type="primary" htmlType="submit" className="sign-button">
                SIGN IN
              </Button>
            </Form.Item>
            <Button type="primary" htmlType="submit" className="sign-button" onClick={mockLogin}>
              MOCK LOGIN
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default connect(null, { change_auth: action.user.change_auth })(Login);
