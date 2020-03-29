import React, { useState } from 'react';
import { Layout, Menu, Typography, Avatar, Divider } from 'antd';
import {
  PicRightOutlined,
  AccountBookOutlined,
  BookOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import Logo from '../../../assets/images/logo.png';
import './SideBarStyle.css';

const { Sider } = Layout;

export default function SideBar() {
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };
  return (
    <div>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} className="sidebar">
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
              <BookOutlined />
              <span>Overall</span>
            </Menu.Item>
            <Menu.Item key="2">
              <AccountBookOutlined />
              <span>Accounts</span>
            </Menu.Item>
            <Menu.Item key="3">
              <PicRightOutlined />
              <span>Categories</span>
            </Menu.Item>
            <Menu.Item key="4">
              <UsergroupAddOutlined />
              <span>Payees</span>
            </Menu.Item>
          </Menu>
        </Sider>
      </Layout>
    </div>
  );
}
