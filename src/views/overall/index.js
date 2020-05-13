import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Tabs, Row, Col } from 'antd';

import { HomeOutlined, AreaChartOutlined } from '@ant-design/icons';
import './Overall.css';

import CreateForm from './CreateForm';
import DataTable from './DataTable';
import Search from './Search';

function Overall(props) {
  const typesTable = { '-1': 'Withdraw', '0': 'Transfer', '1': 'Deposit' };
  const { accountsTable, categoriesTable, payeesTable } = props;
  const [transactions, setTransactions] = useState([]);

  return (
    <div className="main-content">
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
          <Row>
            <Col span={20} style={{ textAlign: 'center' }}>
              <Search
                accountsTable={accountsTable}
                categoriesTable={categoriesTable}
                payeesTable={payeesTable}
                typesTable={typesTable}
                setTransactions={setTransactions}
              />
              <DataTable
                transactions={transactions}
                accountsTable={accountsTable}
                categoriesTable={categoriesTable}
                payeesTable={payeesTable}
                typesTable={typesTable}
              />
            </Col>
            <Col span={4}>
              <CreateForm />
            </Col>
          </Row>
        </Tabs.TabPane>
        <Tabs.TabPane
          className="content"
          tab={
            <span>
              <AreaChartOutlined />
              Family
            </span>
          }
          key="2"
        />
      </Tabs>
    </div>
  );
}

export default connect((state) => ({ ...state.account, ...state.category, ...state.payee }))(
  Overall
);
