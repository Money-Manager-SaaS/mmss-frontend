import React from 'react';
import { Tabs, Row, Col, Button } from 'antd';
import { HomeOutlined, AreaChartOutlined, PlusOutlined } from '@ant-design/icons';
import './Overall.css';
import DataTable from './DataTable';

export default function Overall() {
  const { TabPane } = Tabs;
  return (
    <div className="main-content">
      <Tabs defaultActiveKey="1">
        <TabPane
          className="content"
          tab={
            <span>
              <HomeOutlined />
              Overall
            </span>
          }
          key="1"
        >
          {' '}
          <Row>
            <Col span={18} style={{ textAlign: 'center' }}>
              <DataTable />
              <Button size="large" type="primary" shape="circle" icon={<PlusOutlined />} />
            </Col>
            <Col span={6} style={{ width: '600px' }}></Col>
          </Row>
        </TabPane>
        <TabPane
          className="content"
          tab={
            <span>
              <AreaChartOutlined />
              Diagram
            </span>
          }
          key="2"
        ></TabPane>
      </Tabs>
    </div>
  );
}
