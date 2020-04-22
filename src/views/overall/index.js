import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import action from '@/store/action';
import { toastr } from 'react-redux-toastr';
import { Tabs, Row, Col, Button } from 'antd';

import { HomeOutlined, AreaChartOutlined, PlusOutlined } from '@ant-design/icons';
import './Overall.css';
import CreateForm from '@/components/Forms/CreateForm';
import DataTable from './DataTable';

import { getTransactions } from '../../api/transaction';

function Overall(props) {
  const { transactions, get_transactions, accountsTable, categoriesTable, global_loading } = props;

  // Get transactions
  useEffect(() => {
    global_loading();
    getTransactions()
      .then((data) => {
        if (data.status === 200) {
          get_transactions(data.data);
          global_loading(false);
        } else {
          throw new Error('Not Get Transactions');
        }
      })
      .catch((err) => {
        global_loading(false);
        toastr.error('Opps', 'Not Get Transactions');
        console.log(err);
      });
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
              <DataTable
                transactions={transactions}
                accountsTable={accountsTable}
                categoriesTable={categoriesTable}
              />
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

export default connect((state) => ({ ...state.transaction, ...state.account, ...state.category }), {
  ...action.transaction,
  ...action.globalLoading,
})(Overall);
