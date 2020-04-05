import React from 'react';

import { Table, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './Overall.css';

const { Column } = Table;

const data = [
  {
    key: '1',
    date: '03/12/2020',
    account: 'ANZ',
    to: 'ANZ',
    amount: '$1000',
    type: 'food',
    payee: 'AT',
    category: 'Food',
    note: 'null',
    action: null,
  },
  {
    key: '2',
    date: '03/12/2020',
    account: 'ANZ',
    to: 'ANZ',
    amount: '$1000',
    type: 'food',
    payee: 'AT',
    category: 'Food',
    note: 'null',
    action: null,
  },
  {
    key: '3',
    date: '03/12/2020',
    account: 'ANZ',
    to: 'ANZ',
    amount: '$1000',
    type: 'food',
    payee: 'AT',
    category: 'Food',
    note: 'null',
    action: null,
  },
  {
    key: '4',
    date: '03/12/2020',
    account: 'ANZ',
    to: 'ANZ',
    amount: '$1000',
    type: 'food',
    payee: 'AT',
    category: 'Food',
    note: 'null',
    action: null,
  },
  {
    key: '5',
    date: '03/12/2020',
    account: 'ANZ',
    to: 'ANZ',
    amount: '$1000',
    type: 'food',
    payee: 'AT',
    category: 'Food',
    note: 'null',
    action: null,
  },
  {
    key: '6',
    date: '03/12/2020',
    account: 'ANZ',
    to: 'ANZ',
    amount: '$1000',
    type: 'food',
    payee: 'AT',
    category: 'Food',
    note: 'null',
    action: null,
  },
  {
    key: '7',
    date: '03/12/2020',
    account: 'ANZ',
    to: 'ANZ',
    amount: '$1000',
    type: 'food',
    payee: 'AT',
    category: 'Food',
    note: 'null',
    action: null,
  },
  {
    key: '8',
    date: '03/12/2020',
    account: 'ANZ',
    to: 'ANZ',
    amount: '$1000',
    type: 'food',
    payee: 'AT',
    category: 'Food',
    note: 'null',
    action: null,
  },
  {
    key: '9',
    date: '03/12/2020',
    account: 'ANZ',
    to: 'ANZ',
    amount: '$1000',
    type: 'food',
    payee: 'AT',
    category: 'Food',
    note: 'null',
    action: null,
  },
  {
    key: '10',
    date: '03/12/2020',
    account: 'ANZ',
    to: 'ANZ',
    amount: '$1000',
    type: 'food',
    payee: 'AT',
    category: 'Food',
    note: 'null',
    action: null,
  },
  {
    key: '11',
    date: '03/12/2020',
    account: 'ANZ',
    to: 'ANZ',
    amount: '$1000',
    type: 'food',
    payee: 'AT',
    category: 'Food',
    note: 'null',
    action: null,
  },
  {
    key: '12',
    date: '03/12/2020',
    account: 'ANZ',
    to: 'ANZ',
    amount: '$1000',
    type: 'food',
    payee: 'AT',
    category: 'Food',
    note: 'null',
    action: null,
  },
  {
    key: '13',
    date: '03/12/2020',
    account: 'ANZ',
    to: 'ANZ',
    amount: '$1000',
    type: 'food',
    payee: 'AT',
    category: 'Food',
    note: 'null',
    action: null,
  },
  {
    key: '14',
    date: '03/12/2020',
    account: 'ANZ',
    to: 'ANZ',
    amount: '$1000',
    type: 'food',
    payee: 'AT',
    category: 'Food',
    note: 'null',
    action: null,
  },
  {
    key: '15',
    date: '03/12/2020',
    account: 'ANZ',
    to: 'ANZ',
    amount: '$1000',
    type: 'food',
    payee: 'AT',
    category: 'Food',
    note: 'null',
    action: null,
  },
  {
    key: '16',
    date: '03/12/2020',
    account: 'ANZ',
    to: 'ANZ',
    amount: '$1000',
    type: 'food',
    payee: 'AT',
    category: 'Food',
    note: 'null',
    action: null,
  },
];

function DataTable({ transactions }) {
  // const data = transactions;

  // console.log(data);
  return (
    <Table dataSource={data} size="middle">
      <Column title="DATE" dataIndex="date" key="date" />
      <Column title="ACCOUNT" dataIndex="account" key="account" />
      <Column title="TO" dataIndex="to" key="to" />
      <Column title="AMOUNT" dataIndex="amount" key="amount" />
      <Column title="TYPE" dataIndex="type" key="type" />
      <Column title="PAYEE" dataIndex="payee" key="payee" />
      <Column title="CATEGORY" dataIndex="category" key="category" />
      <Column title="NOTE" dataIndex="note" key="note" />
      <Column
        title="action"
        key="action"
        render={() => (
          <span>
            <Button shape="circle-outline" className="editbtn">
              <EditOutlined />
            </Button>
            <Button shape="circle-outline" className="deletebtn">
              <DeleteOutlined />
            </Button>
          </span>
        )}
      />
    </Table>
  );
}

export default DataTable;
