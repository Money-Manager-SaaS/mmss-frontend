import React from 'react';
import { Form, Input, Button, Row, Col, Typography, Divider, Checkbox } from 'antd';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { setEmail } from '../../utils';
import action from '@/store/action';
import signLogo from '@/assets/images/sign-logo.png';
import smallLogo from '@/assets/images/mini-logo.png';
import './Sign.css';

const Registe = ({ change_auth }) => {
  // const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const mockLogin = (e) => {
    e.preventDefault();
    change_auth({ email: '39260972@qq.com', auth: true });
    setEmail('39260972@qq.com');
  };
  return (
    <Row>
      <Col className="left-section" md={12}>
        <Typography className="app-name">MM CLOUD</Typography>
        <img src={signLogo} alt="mmcloud" className="app-logo" />
      </Col>
      <Col className="right-section" xs={24} sm={24} md={12}>
        <Form name="register" onFinish={onFinish} scrollToFirstError>
          <Form.Item>
            <Typography className="sign-title">SIGN UP</Typography>
            <Divider className="divider" />
          </Form.Item>

          <div className="mobile-logo">
            <img src={smallLogo} alt="mmcloud" className="small-logo" />
            <span className="mobile-title">MM Cloud</span>
          </div>

          <Form.Item
            className="item-label"
            name="email"
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
            <Typography className="item-label">Username/Email</Typography>
            <Input className="text-field" placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Typography className="item-label">Password</Typography>
            <Input.Password className="text-field" placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="confirm"
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
            <Typography className="item-label">Password</Typography>
            <Input.Password className="text-field" placeholder="Username" />
          </Form.Item>
          <Form.Item className="description">
            <Checkbox>
              <a href="/#">I agree with terms and conditions</a>
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
          <Button type="primary" htmlType="submit" className="sign-button" onClick={mockLogin}>
            Mock Register
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default connect(null, { change_auth: action.user.change_auth })(Registe);
