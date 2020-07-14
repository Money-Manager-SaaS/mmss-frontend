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

  const [collapsed, setCollapsed] = useState(true);

  const onMouseOver = () => {
    setCollapsed(false);
  };
  const onMouseOut = () => {
    setCollapsed(true);
  };

  return (
    <Layout.Sider
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      collapsed={collapsed}
      className="sidebar"
    >
      <div>
        <div className="logo">
          <Avatar shape="square" size={48} src={Logo} />
        </div>
        {/* {collapsed ? (
          <div className="logo">
            <Avatar shape="square" size={48} src={Logo} />
          </div>
        ) : (
          <Typography className="logoName">MM Cloud</Typography>
        )} */}
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
      </div>
    </Layout.Sider>
  );
}
export default withRouter(SideBar);
