import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Typography, Avatar, Divider } from 'antd';
import {
  PicRightOutlined,
  AccountBookOutlined,
  BookOutlined,
  UsergroupAddOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import Logo from '../../../assets/images/logo.png';
import './SideBarStyle.css';

export default function SideBar() {
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };
  return (
    <Layout.Sider collapsible collapsed={collapsed} onCollapse={onCollapse} className="sidebar">
      {collapsed ? (
        <div className="logo">
          <Avatar shape="square" size={48} src={Logo} />
        </div>
      ) : (
        <Typography className="logoName">MM Cloud</Typography>
      )}
      <Divider className="divider" />
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" className="menu">
        <Menu.Item key="1">
          <Link to="/">
            <BookOutlined />
            <span>Overall</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/accounts">
            <AccountBookOutlined />
            <span>Accounts</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/categories">
            <PicRightOutlined />
            <span>Categories</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to="/payees">
            <UsergroupAddOutlined />
            <span>Payees</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="5">
          <Link to="/profile">
            <SmileOutlined />
            <span>My Profile</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  );
}