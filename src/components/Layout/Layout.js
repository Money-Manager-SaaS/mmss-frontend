import React from 'react';
import SideBar from './SideBar/SideBar';
import UserInfo from './UserInfo/UserInfo';
import { Layout as AntdLayout } from 'antd';
import Header from './Header';
export default function Layout(props) {
  return (
    <>
      <Header />
      <AntdLayout style={{ height: '100%', backgroundColor: 'rgb(240, 242, 245)' }}>
        <SideBar />
        <UserInfo />
        <div style={{ flex: 1 }}>{props.children}</div>
      </AntdLayout>
    </>
  );
}
