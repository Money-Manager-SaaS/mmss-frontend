import React, { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { EditableCell, EditableRow } from '../../utils/editable';
import moment from 'moment';

export default function DataTable({
  transactions,
  accountsTable,
  categoriesTable,
  payeesTable,
  typesTable,
}) {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setDataSource(
      transactions.map((transaction) => ({
        key: transaction.id,
        date: moment(transaction.createdAt).format('MM/DD/YYYY'),
        account: accountsTable[transaction.accountID],
        to: accountsTable[transaction.toAccountID],
        amount: '$' + transaction.amount.toFixed(2),
        type: typesTable[transaction.transferType],
        payee: payeesTable[transaction.payeeId],
        category: categoriesTable[transaction.categoryID],
        note: transaction.note,
        action: null,
      }))
    );
  }, [transactions, accountsTable, categoriesTable, payeesTable, typesTable]);

  const handleDelete = (row) => {
    //api call delete to backand with id(row.key) as parameter
    setDataSource(dataSource.filter((item) => item.key !== row.key));
  };

  const columnsSet = [
    { title: 'DATE', dataIndex: 'date', key: 'date' },
    { title: 'ACCOUNT', dataIndex: 'account', key: 'account' },
    { title: 'TO', dataIndex: 'to', key: 'to' },
    { title: 'AMOUNT', dataIndex: 'amount', key: 'amount' },
    { title: 'TYPE', dataIndex: 'type', key: 'type' },
    { title: 'PAYEE', dataIndex: 'payee', key: 'payee' },
    { title: 'CATEGORY', dataIndex: 'category', key: 'category' },
    { title: 'NOTE', dataIndex: 'note', key: 'note', editable: true },
    {
      title: 'action',
      key: 'action',
      render: (row) => (
        <Button
          onClick={() => {
            handleDelete(row);
          }}
          shape="circle-outline"
          className="deletebtn"
        >
          <DeleteOutlined />
        </Button>
      ),
    },
  ];

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const handleSave = (row) => {
    //api call put row.notes to backand with id(row.key) as parameter
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    console.log(`changing transaction notes... ID is ${row.key}`, row, item);
    newData.splice(index, 1, row);
    setDataSource(newData);
  };

  const columns = columnsSet.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return <Table dataSource={dataSource} size="middle" columns={columns} components={components} />;
}
