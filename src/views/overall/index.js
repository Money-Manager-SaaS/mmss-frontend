import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Tabs, Row, Col } from 'antd';
import action from 'store/action';
import { HomeOutlined } from '@ant-design/icons';
import './Overall.css';

import CreateForm from './CreateForm';
import DataTable from './DataTable';
import Search from './Search';

function Overall(props) {
  const typesTable = { '-1': 'Withdraw', '0': 'Transfer', '1': 'Deposit' };
  const { accountsTable, categoriesTable, payeesTable, categories, global_loading } = props;
  const [transactions, setTransactions] = useState([]);

  const handleShowCreate = (e) => {
    if (e.keyCode === 67 && e.ctrlKey) {
      console.log('You Press Ctrl + C put something inside.');
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleShowCreate);
    return () => {
      document.removeEventListener('keydown', handleShowCreate);
    };
  }, []);

  return (
    <div
      className="main-content"
      style={{ height: 'calc(100% - 70px)', width: 'calc(100% - 40px)' }}
    >
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane
          className="content"
          tab={
            <span>
              <HomeOutlined />
              Default
            </span>
          }
          key="1"
        >
          <Row style={{ height: '95%', overflowY: 'scroll' }} className="data-section">
            <Col span={20} className="section-padding">
              <Search
                accountsTable={accountsTable}
                categoriesTable={categoriesTable}
                payeesTable={payeesTable}
                typesTable={typesTable}
                setTransactions={setTransactions}
                global_loading={global_loading}
              />
              <DataTable
                style={{ height: '60%' }}
                transactions={transactions}
                accountsTable={accountsTable}
                categoriesTable={categoriesTable}
                payeesTable={payeesTable}
                typesTable={typesTable}
                setTransactions={setTransactions}
                global_loading={global_loading}
              />
            </Col>
            <Col span={4} className="section-padding">
              {' '}
              <CreateForm
                setTransactions={setTransactions}
                categories={categories}
                accountsTable={accountsTable}
                categoriesTable={categoriesTable}
                payeesTable={payeesTable}
                typesTable={typesTable}
                global_loading={global_loading}
              />
            </Col>
          </Row>
        </Tabs.TabPane>
        {/* <Tabs.TabPane
          className="content"
          tab={
            <span>
              <AreaChartOutlined />
              Family
            </span>
          }
          key="2"
        /> */}
      </Tabs>
    </div>
  );
}

export default connect(
  (state) => ({ ...state.account, ...state.category, ...state.payee }),
  action.globalLoading
)(Overall);
