import React, { useState } from 'react';
import { Tabs, Row, Col, Button } from 'antd';
import { HomeOutlined, AreaChartOutlined, PlusOutlined } from '@ant-design/icons';
import './Overall.css';
import CreateForm from '@/components/Forms/CreateForm';
import DataTable from './DataTable';

export default function Overall() {
  const { TabPane } = Tabs;
  const [visible, setVisible] = useState(false);
  //handle form open
  const showCreateForm = () => {
    setVisible(true);
  };
  // handle form OK
  const handleOK = () => {
    setVisible(false);
  };
  // handle form cancel
  const handleCancel = () => {
    setVisible(false);
  };

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
              <Button
                type="primary"
                shape="circle"
                className="addBtn"
                icon={<PlusOutlined />}
                onClick={showCreateForm}
              />
              <CreateForm visible={visible} handleOK={handleOK} handleCancel={handleCancel} />
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
