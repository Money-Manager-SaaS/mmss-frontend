import React, { useState, useEffect } from 'react';
import { Table, Button, Popconfirm, Form, Tooltip, Space } from 'antd';
import { SaveOutlined, EditOutlined, DeleteOutlined, CloseOutlined } from '@ant-design/icons';
import EditableCell from 'components/EditableCell';
import moment from 'moment';
import { deleteTransaction, updateTransaction } from 'api/transaction';

import { toastr } from 'react-redux-toastr';

function valueIsNumber(num) {
  return typeof num === 'number' ? num : '';
}

export default function DataTable({
  transactions,
  accountsTable,
  categoriesTable,
  payeesTable,
  typesTable,
  global_loading,
  setTransactions,
}) {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setDataSource(
      transactions.map((transaction) => ({
        key: transaction.id,
        date: moment(transaction.date ? transaction.date : transaction.createdAt).format(
          'MM/DD/YYYY'
        ),
        account: accountsTable[transaction.accountID],
        to: accountsTable[transaction.toAccountID],
        amount: '$' + transaction.amount.toFixed(2),
        type: typesTable[transaction.transferType],
        payee: payeesTable[transaction.payeeID],
        category: categoriesTable[transaction.categoryID],
        note: transaction.note,
        action: null,
      }))
    );
  }, [transactions, accountsTable, categoriesTable, payeesTable, typesTable]);

  const handleDelete = (row) => {
    global_loading();

    const data = { id: row.key };
    deleteTransaction(data)
      .then((res) => {
        if (res.status === 200) {
          setTransactions((transactions) => transactions.filter((t) => t.id !== row.key));
          toastr.success('OK', 'Delete Transaction Successfully');
        } else {
          toastr.warning('Failed', 'Delete Transaction Failed');
        }
        global_loading(false);
      })
      .catch((err) => {
        console.log(err);
        global_loading(false);
        toastr.error('Error', 'Error');
      });
  };

  const [form] = Form.useForm();

  const edit = (record) => {
    form.setFieldsValue({
      ...record,
      amount: Number(record.amount.substring(1)),
      date: moment(record.date),
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = (key) => {
    let row = form.getFieldsValue();
    const newData = [...dataSource];
    const index = newData.findIndex((item) => key === item.key);
    console.log(row, key, index);

    const data = {
      id: key,
      date: row.date,
      transferType: valueIsNumber(row.type),
      categoryID: valueIsNumber(row.category),
      accountID: valueIsNumber(row.account),
      payeeID: valueIsNumber(row.payee),
      amount: Number(row.amount),
      toAccountID: valueIsNumber(row.to),
      note: row.note,
    };

    for (const key in data) {
      if (data[key] === '' || data[key] === undefined) {
        delete data[key];
      }
    }
    console.log(data);

    updateTransaction(data)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setTransactions((transactions) =>
            transactions.map((transaction) => (transaction.id === data.id ? res.data : transaction))
          );

          toastr.success('OK', 'Update Transaction Successfully');
        } else {
          toastr.warning('Failed', 'Update Transaction Failed');
        }
        setEditingKey('');
        global_loading(false);
      })
      .catch((err) => {
        console.log(err);
        global_loading(false);
        toastr.error('Error', 'Error');
      });
  };

  const columnsSet = [
    { title: 'DATE', dataIndex: 'date', key: 'date', editable: true },
    {
      title: 'ACCOUNT',
      dataIndex: 'account',
      key: 'account',
      editable: true,

      selectTable: accountsTable,
    },
    {
      title: 'TO',
      dataIndex: 'to',
      key: 'to',
      editable: true,
      selectTable: accountsTable,
    },
    { title: 'AMOUNT', dataIndex: 'amount', key: 'amount', editable: true },
    {
      title: 'TYPE',
      dataIndex: 'type',
      key: 'type',
      editable: true,
      selectTable: typesTable,
    },
    {
      title: 'PAYEE',
      dataIndex: 'payee',
      key: 'payee',
      editable: true,
      selectTable: payeesTable,
    },
    {
      title: 'CATEGORY',
      dataIndex: 'category',
      key: 'category',
      editable: true,
      selectTable: categoriesTable,
    },
    { title: 'NOTE', dataIndex: 'note', key: 'note', editable: true },
    {
      title: 'action',
      key: 'action',
      render: (row, record) => {
        const editable = isEditing(record);
        const SaveCancel = () => (
          <Space>
            <Tooltip placement="top" title="Save">
              <Button
                className="edit-save-btn"
                shape="circle-outline"
                onClick={() => save(record.key)}
                icon={<SaveOutlined />}
              />
            </Tooltip>
            <Tooltip placement="top" title="Cancel">
              <Button
                className="cancelbtn"
                shape="circle"
                onClick={cancel}
                icon={<CloseOutlined />}
              />
            </Tooltip>
          </Space>
        );

        const EditDelete = () => (
          <Space>
            <Tooltip placement="top" title="Edit">
              <Button
                disabled={editingKey !== ''}
                onClick={() => edit(record)}
                shape="circle-outline"
                className="edit-save-btn"
                icon={<EditOutlined />}
              />
            </Tooltip>
            <Popconfirm
              title="Sure ?"
              onConfirm={() => {
                handleDelete(row);
              }}
            >
              <Tooltip placement="top" title="Delete">
                <Button
                  disabled={editingKey !== ''}
                  shape="circle-outline"
                  className="deletebtn"
                  icon={<DeleteOutlined />}
                />
              </Tooltip>
            </Popconfirm>
          </Space>
        );
        return <>{editable ? <SaveCancel /> : <EditDelete />}</>;
      },
    },
  ];

  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record.key === editingKey;
  const mergedColumns = columnsSet.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        selectTable: col.selectTable,
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        dataSource={dataSource}
        size="middle"
        columns={mergedColumns}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        pagination={{
          position: ["bottomCenter"]
        }}
      />
    </Form>
  );
}
