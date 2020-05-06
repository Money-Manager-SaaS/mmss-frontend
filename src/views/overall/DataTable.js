import React, { useState, useEffect } from 'react';
import { Table, Button, Popconfirm, Form, Tooltip } from 'antd';
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
    form.setFieldsValue({
      ...record,
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
    { title: 'ACCOUNT', dataIndex: 'account', key: 'account', editable: true },
    { title: 'TO', dataIndex: 'to', key: 'to', editable: true },
    { title: 'AMOUNT', dataIndex: 'amount', key: 'amount', editable: true },
    { title: 'TYPE', dataIndex: 'type', key: 'type', editable: true },
    { title: 'PAYEE', dataIndex: 'payee', key: 'payee', editable: true },
    {
      title: 'CATEGORY',
      dataIndex: 'category',
      key: 'category',
      editable: true,
      inputType: 'select',
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
              <div>
                <Tooltip placement="top" title="Save">
                  <Button
                    className="edit-save-btn"
                    shape="circle-outline"
                    onClick={() => save(record.key)}
                    style={{
                      marginRight: 8,
                    }}
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
              </div>
            ) : (
              <>
                <Popconfirm title="Sure ?" onConfirm={cancel}>
                  <Tooltip placement="top" title="Edit">
                    <Button
                      disabled={editingKey !== ''}
                      onClick={() => edit(record)}
                      shape="circle-outline"
                      className="edit-save-btn"
                      icon={<EditOutlined />}
                    />
                  </Tooltip>
                </Popconfirm>
                <Tooltip placement="top" title="Delete">
                  <Button
                    onClick={() => {
                      handleDelete(row);
                    }}
                    disabled={editingKey !== ''}
                    shape="circle-outline"
                    className="deletebtn"
                    icon={<DeleteOutlined />}
                  />
                </Tooltip>
              </>
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
        inputType: col.inputType ? col.inputType : 'text',
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
