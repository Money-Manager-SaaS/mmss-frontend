import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu, Typography, Avatar, Divider } from 'antd';

import Logo from '../../../assets/images/logo.png';
import './SideBarStyle.css';
import routes from '../../../routes';

function SideBar({ history }) {
  const {
    location: { pathname },
  } = history;

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
      <Menu theme="dark" defaultSelectedKeys={[pathname]} mode="inline" className="menu">
        {routes.map(
          (route) =>
            route.name && (
              <Menu.Item key={route.path}>
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
export default withRouter(SideBar);
