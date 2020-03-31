import React from 'react';
import { Table, Tag } from 'antd';

const { Column, ColumnGroup } = Table;

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

export default function DataTable() {
  return (
    <Table dataSource={data} size="large">
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
            <a style={{ marginRight: 16 }}>Modify</a>
            <a>Delete</a>
          </span>
        )}
      />
    </Table>
  );
}
