import React from 'react';
import { Table, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './Overall.css';

const { Column } = Table;

function getAccountName(id, accounts) {
  const findAccount = accounts.find((account) => account.id === id);
  return findAccount ? findAccount.name : '';
}

export default function DataTable({ transactions = [], accounts = [] }) {
  console.log(accounts, transactions);

  const dataSource = transactions.map((transaction) => ({
    key: transaction.id,
    date: transaction.createdAt,
    account: getAccountName(transaction.accountID, accounts),
    to: getAccountName(transaction.toAccountID, accounts),
    amount: transaction.amount,
    payee: transaction.payeeId,
    category: transaction.categoryID,
    note: transaction.note,
    action: null,
  }));

  return (
    <Table dataSource={dataSource} size="middle">
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

