import React from 'react';
import { Tabs } from 'antd';
import './Setting.css';
import Account from './Sections/Account';
import Category from './Sections/Category';
import Payee from './Sections/Payee';
import { PicRightOutlined, AccountBookOutlined, UsergroupAddOutlined } from '@ant-design/icons';

export default function Setting() {
  return (
    <div className="main-content">
      <Tabs defaultActiveKey="1" type="card">
        <Tabs.TabPane
          tab={
            <span>
              <AccountBookOutlined />
              Accounts
            </span>
          }
          key="1"
        >
          {' '}
          <Account />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span>
              <PicRightOutlined />
              Categories
            </span>
          }
          key="2"
        >
          {' '}
          <Category />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span>
              <UsergroupAddOutlined />
              Payees
            </span>
          }
          key="3"
        >
          {' '}
          <Payee />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
