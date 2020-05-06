import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import action from '@/store/action';
import { toastr } from 'react-redux-toastr';
import { Tabs, Row, Col, Button, DatePicker, Select, Input } from 'antd';

import { HomeOutlined, AreaChartOutlined } from '@ant-design/icons';
import './Overall.css';
import moment from 'moment';
import CreateForm from './CreateForm';
import DataTable from './DataTable';
import { getTransactions } from '../../api/transaction';

const { Option } = Select;
const { RangePicker } = DatePicker;
const typesTable = { '-1': 'Withdraw', '0': 'Transfer', '1': 'Deposit' };

function Overall(props) {
  const { accountsTable, categoriesTable, global_loading, payeesTable } = props;
  const [transactions, setTransactions] = useState([]);
  // Get transactions
  const [dateFrom, setDateFrom] = useState(moment().subtract(3, 'day'));
  const [dateTo, setDateTo] = useState(moment());
  const [payee, setPayee] = useState();

  const [categories, setCategories] = useState([]);

  function confirmSearchPayee(value) {
    setPayee(value);
    console.log(`selected ${value}`);
  }

  function confirmSearchCategories(value) {
    setCategories(value);
  }

  function confirmSearchDate(value) {
    setDateFrom(value[0]);
    setDateTo(value[1]);
  }
  useEffect(() => {
    global_loading();
    getTransactions()
      .then((data) => {
        if (data.status === 200) {
          console.log(data.data);
          setTransactions(data.data.transactions);
        } else {
          toastr.warning('Opps', 'Not Get Transactions');
        }
        global_loading(false);
      })
      .catch((err) => {
        global_loading(false);
        toastr.error('Error', 'Not Get Transactions');
        console.log(err);
      });
  }, [global_loading]);

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
              <div className="section-search">
                <RangePicker
                  style={{ maxWidth: 160 }}
                  format="MM-DD-YYYY"
                  onOk={confirmSearchDate}
                  value={[dateFrom, dateTo]}
                  showTime={{
                    defaultValue: moment('00:00:00', 'HH:mm:ss'),
                  }}
                />
                <Select className="search-field" placeholder="Select Accounts"></Select>
                <Select className="search-field" placeholder="Select Types"></Select>
                <Select
                  className="search-field"
                  mode="multiple"
                  style={{ minWidth: 160 }}
                  placeholder="Select Payees"
                  onChange={confirmSearchPayee}
                  optionLabelProp="label"
                  value={payee}
                >
                  {Object.keys(payeesTable).map((key, index) => (
                    <Option key={index} value={key} label={payeesTable[key]}>
                      {payeesTable[key]}
                    </Option>
                  ))}
                </Select>
                <Select
                  mode="multiple"
                  className="search-field"
                  style={{ minWidth: 160 }}
                  placeholder="Select Categories"
                  value={categories}
                  onChange={confirmSearchCategories}
                  optionLabelProp="label"
                >
                  {Object.keys(categoriesTable).map((key, index) => (
                    <Option key={index} value={key} label={categoriesTable[key]}>
                      {categoriesTable[key]}
                    </Option>
                  ))}
                </Select>
                <Input.Search className="search-field" style={{ maxWidth: 120 }}></Input.Search>
                <Button
                  type="primary"
                  onClick={() => {
                    toastr.success(
                      'search data',
                      `${dateFrom.format('YYYY:MM:DD')} ${dateTo.format(
                        'YYYY:MM:DD'
                      )} ${payee} ${categories.toString()}`
                    );
                  }}
                >
                  CLEAR ALL
                </Button>
              </div>
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

export default connect(
  (state) => ({ ...state.account, ...state.category, ...state.payee }),

  action.globalLoading
)(Overall);
