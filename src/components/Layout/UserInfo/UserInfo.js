import React from 'react';
import { Typography, Avatar, Button, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import './UserInfoStyle.css';

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
        About me
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
        Change password
      </a>
    </Menu.Item>
  </Menu>
);

export default function UserInfo() {
  return (
    <div className="user-info">
      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link">
          <Typography className="user-name">John Key</Typography>{' '}
          <DownOutlined className="arrow-down" />
        </a>
      </Dropdown>
      <Avatar className="user-symbol">J</Avatar>
      <Button className="btn">Log Out</Button>
    </div>
  );
}
