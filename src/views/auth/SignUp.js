import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, Typography, Divider, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import { toastr } from 'react-redux-toastr';
import signLogo from '@/assets/images/sign-logo.png';
import smallLogo from '@/assets/images/mini-logo.png';
import './Sign.css';
import { userRegister } from 'api/user';

export default ({ history }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const onFinish = (values) => {
    const data = { userName, password, email: userName };
    userRegister(data)
      .then((res) => {
        toastr.success('Success', 'Please use your username and password to login');
        history.push('login');
      })
      .catch((err) => {
        toastr.error('Error', 'Password maybe too weak or email has been registered');
        console.log(err);
      });
  };

  return (
    <Row>
      <Col className="left-section" md={12}>
        <Typography className="app-name">MM CLOUD</Typography>
        <img src={signLogo} alt="mmcloud" className="app-logo" />
      </Col>
      <Col className="right-section" xs={24} sm={24} md={12}>
        <Form name="register" onFinish={onFinish} scrollToFirstError>
          <div className="mobile-logo">
            <img src={smallLogo} alt="mmcloud" className="small-logo" />
            <span className="mobile-title">MM Cloud</span>
          </div>
          <Form.Item>
            <Typography className="sign-title">SIGN UP</Typography>
            <Divider className="divider" />
          </Form.Item>

          <Form.Item
            className="item-label"
            name="email"
            label={<Typography className="item-label">Username/Email</Typography>}
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
            {/* <Typography className="item-label">Username/Email</Typography> */}
            <Input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="text-field"
              placeholder="Username"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label={<Typography className="item-label">Password</Typography>}
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            {/* <Typography className="item-label">Password</Typography> */}
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-field"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item
            name="confirm"
            label={<Typography className="item-label">Confirm Password</Typography>}
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
            {/* <Typography className="item-label">Confirm Password</Typography> */}
            <Input.Password className="text-field" placeholder="Confirm Password" />
          </Form.Item>
          <Form.Item className="description">
            <Checkbox>
              <a href="/#" className="text-color">
                I agree with terms and conditions
              </a>
            </Checkbox>
          </Form.Item>
          <Form.Item className="description">
            <Link to="/login">Already have an account? Sign in here</Link>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="sign-button">
              SIGN UP
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};
