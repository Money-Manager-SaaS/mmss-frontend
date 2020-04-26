import React from 'react';
import { Table, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Column } = Table;

export default function DataTable({
  transactions,
  accountsTable,
  categoriesTable,
  payeesTable,
  typesTable,
}) {
  const dataSource = transactions.map((transaction) => ({
    key: transaction.id,
    date: new Date(transaction.createdAt).toLocaleString('en-GB'),
    account: accountsTable[transaction.accountID],
    to: accountsTable[transaction.toAccountID],
    amount: '$' + transaction.amount.toFixed(2),
    type: typesTable[transaction.transferType],
    payee: payeesTable[transaction.payeeId],
    category: categoriesTable[transaction.categoryID],
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
