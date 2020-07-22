import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import action from '@/store/action';
import { setRefreshToken } from 'utils';
import { userLogin } from 'api/user';
import { Form, Input, Button, Row, Col, Typography, Divider } from 'antd';
import signLogo from '@/assets/images/sign-logo.png';
import smallLogo from '@/assets/images/mini-logo.png';
import './Sign.css';
import { toastr } from 'react-redux-toastr';
const Login = ({ change_auth }) => {
  const [email, setLoginEmail] = useState('');
  const [password, setPassword] = useState('');

  const onFinish = (values) => {
    const data = { email, password };
    console.log(data);
    console.log('Received values of form: ', values);
    userLogin(data)
      .then((res) => {
        change_auth({ email: res.data.user.email, refreshToken: res.data.refreshToken });
        setRefreshToken(res.data.refreshToken);

        toastr.success('Success', 'Login Successfully');
      })
      .catch((err) => {
        toastr.error('Error', 'Password or email might wrong');
        console.log(err);
      });
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
            <div className="heading">
              <Typography className="sign-title">SIGN IN</Typography>
              <Divider className="divider" />
            </div>
            <Form.Item>
              <Typography className="item-label">Username/Email</Typography>
              <Form.Item
                value={email}
                name="email"
                rules={[{ required: true, message: 'Please input your name or Email!' }]}
              >
                <Input
                  className="text-field"
                  placeholder="Username"
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </Form.Item>
            </Form.Item>
            <Form.Item>
              <Typography className="item-label">Password</Typography>
              <Form.Item
                value={password}
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
              >
                <Input
                  className="text-field"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>
            </Form.Item>

            <Form.Item className="description">
              <Link to="/register">Haven't registed yet? Sign up now</Link>
              <Button type="primary" htmlType="submit" className="sign-button">
                SIGN IN
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default connect(null, { change_auth: action.user.change_auth })(Login);
