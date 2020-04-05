import React from 'react';
import SideBar from './SideBar/SideBar';
import UserInfo from './UserInfo/UserInfo';
import { Layout as AntdLayout } from 'antd';

export default function Layout(props) {
  return (
    <AntdLayout
      style={{ minHeight: '100vh', maxHeight: '100vh', backgroundColor: 'rgb(240, 242, 245)' }}
    >
      <SideBar />
      <UserInfo />
      <div>{props.children}</div>
    </AntdLayout>
  );
}
