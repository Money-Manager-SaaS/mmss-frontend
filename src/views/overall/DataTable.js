import React, { useState, useEffect } from 'react';
import { Table, Button, Popconfirm, Form, Tooltip, Space } from 'antd';
import { SaveOutlined, EditOutlined, DeleteOutlined, CloseOutlined } from '@ant-design/icons';
import { EditableCell } from '../../utils/editable';
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

  const [form] = Form.useForm();

  const edit = (record) => {
    console.log(record, { ...record, date: moment(record.date) });
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
    try {
      console.log(form);
      let row = form.getFieldsValue();
      const newData = [...dataSource];
      const index = newData.findIndex((item) => key === item.key);
      console.log(row, key, index);
      if (index > -1) {
        const item = newData[index];
        if (item.category !== row.category) {
          row = { ...row, category: categoriesTable[row.category] };
        }
        if (item.payee !== row.payee) {
          row = { ...row, payee: payeesTable[row.payee] };
        }
        if (item.to !== row.to) {
          row = { ...row, to: accountsTable[row.to] };
        }
        if (item.account !== row.account) {
          row = { ...row, account: accountsTable[row.account] };
        }
        if (item.type !== row.type) {
          row = { ...row, type: typesTable[row.type] };
        }
        if (item.date !== row.date) {
          row = { ...row, date: moment(row.date).format('MM/DD/YYYY') };
        }
        row = { ...row, amount: '$' + Number(row.amount).toFixed(2) };
        newData.splice(index, 1, row);
        setDataSource(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setDataSource(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
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
        return (
          <>
            {editable ? (
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
            ) : (
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
            )}
          </>
        );
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
      />
    </Form>
  );
}
