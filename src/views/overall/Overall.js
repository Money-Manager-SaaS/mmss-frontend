import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import action from '@/store/action';

import { Tabs, Row, Col, Button } from 'antd';

import { HomeOutlined, AreaChartOutlined, PlusOutlined } from '@ant-design/icons';
import './Overall.css';
import CreateForm from '@/components/Forms/CreateForm';
import DataTable from './DataTable';

function Overall(props) {
  const { transactions, get_transactions, accounts } = props;

  // Get transactions
  useEffect(() => {
    get_transactions();
  }, [get_transactions]);

  const [visible, setVisible] = useState(false);
  // handle form open
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
        <Tabs.TabPane
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
              <DataTable transactions={transactions} accounts={accounts} />
              <Button
                type="primary"
                shape="circle"
                className="addBtn"
                icon={<PlusOutlined />}
                onClick={showCreateForm}
              />
              <CreateForm visible={visible} handleOK={handleOK} handleCancel={handleCancel} />
            </Col>
            <Col span={6} style={{ width: '600px' }} />
          </Row>
        </Tabs.TabPane>
        <Tabs.TabPane
          className="content"
          tab={
            <span>
              <AreaChartOutlined />
              Diagram
            </span>
          }
          key="2"
        />
      </Tabs>
    </div>
  );
}

export default connect((state) => ({ ...state.transaction, ...state.account }), {
  ...action.transaction,
})(Overall);
