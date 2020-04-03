import React from 'react';
import { Typography, Avatar, Button, Dropdown, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';
import './UserInfoStyle.css';

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

export default function UserInfo() {
  return (
    <div className="user-info">
      <Dropdown overlay={menu}>
        <Link className="ant-dropdown-link" to="/profile">
          <Typography className="user-name">John Key</Typography>{' '}
          <DownOutlined className="arrow-down" />
        </Link>
      </Dropdown>
      <Avatar className="user-symbol">J</Avatar>
      <Button className="btn">Log Out</Button>
    </div>
  );
}
