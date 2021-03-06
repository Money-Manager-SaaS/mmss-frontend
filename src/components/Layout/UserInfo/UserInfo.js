import React from 'react';
import { Avatar, Button, Dropdown, Menu, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';
import './UserInfoStyle.css';
import { connect } from 'react-redux';
import action from '../../../store/action';
import { removeRefreshToken } from 'utils';
const menu = (
  <Menu>
    <Menu.Item>
      <Link to="/profile">About me</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/profile">Change password</Link>
    </Menu.Item>
  </Menu>
);

export function UserInfo({ email, change_auth }) {
  const logout = () => {
    change_auth({ email: '', refreshToken: undefined });
    removeRefreshToken();
  };
  return (
    <div className="user-info">
      <Dropdown overlay={menu}>
        <Link className="ant-dropdown-link" to="/profile">
          <Typography className="user-name">Hi{email}</Typography>{' '}
          <DownOutlined className="arrow-down" />
        </Link>
      </Dropdown>
      <Avatar className="user-symbol">J</Avatar>
      <Button className="btn" onClick={logout}>
        Log Out
      </Button>
    </div>
  );
}

export default connect((state) => ({ email: state.user.email }), {
  change_auth: action.user.change_auth,
})(UserInfo);
