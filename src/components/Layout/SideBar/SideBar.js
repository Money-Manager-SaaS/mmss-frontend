import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Typography, Avatar, Divider } from 'antd';

import Logo from '../../../assets/images/logo.png';
import './SideBarStyle.css';
import routes from '../../../routes';

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
        {routes.map(
          (route, index) =>
            route.name && (
              <Menu.Item key={index}>
                <Link to={route.path}>
                  {route.icon}
                  <span>{route.name}</span>
                </Link>
              </Menu.Item>
            )
        )}
      </Menu>
    </Layout.Sider>
  );
}
