import React from 'react';
import { Tabs } from 'antd';
import { HeartOutlined, LockOutlined } from '@ant-design/icons';
import './Profile.css';

export default function Profile() {
  return (
    <div className="main-content">
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane
          className="content"
          tab={
            <span>
              <HeartOutlined />
              About Me
            </span>
          }
          key="1"
        >
          {' '}
          1
        </Tabs.TabPane>
        <Tabs.TabPane
          className="content"
          tab={
            <span>
              <LockOutlined />
              Password
            </span>
          }
          key="2"
        >
          2
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
