import React, { useState, useEffect } from 'react';
import { Radio, Form, Select, InputNumber, Input, Button, DatePicker } from 'antd';

import moment from 'moment';

import { createTransaction } from 'api/transaction';
import './CreateForm.css';
import { toastr } from 'react-redux-toastr';

const { Option } = Select;
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

export default function CreateForm({
  accountsTable,
  categoriesTable,
  payeesTable,
  typesTable,
  global_loading,
  setTransactions,
}) {
  const [date, setDate] = useState(moment());
  const [transferType, setTransferType] = useState(-1);
  const [categoryID, setCategoryID] = useState('');
  const [accountID, setAccountID] = useState('');
  const [payeeID, setPayeeID] = useState('');
  const [amount, setAmount] = useState('');
  const [toAccountID, setToAccountID] = useState('');
  const [note, setNote] = useState('');

  const createTheTransaction = () => {
    if (isNaN(amount) || amount <= 0) {
      toastr.warning('Failed', 'Amount should be number and over 0');
      return;
    }
    global_loading();
    const data = {
      date,
      transferType,
      categoryID,
      accountID,
      payeeID,
      amount,
      toAccountID,
      note,
    };

    for (const key in data) {
      if (data[key] === '') {
        delete data[key];
      }
    }

    createTransaction(data)
      .then((res) => {
        if (res.status === 200) {
          setTransactions((transactions) => [...transactions, res.data]);
          setPayeeID('');
          setAmount('');
          setToAccountID('');
          setNote('');
          toastr.success('OK', 'Create Transaction Successfully');
        } else {
          toastr.warning('Failed', 'Create Transaction Failed');
        }
        global_loading(false);
      })
      .catch((err) => {
        console.log(err);
        global_loading(false);
        toastr.error('Error', 'Error');
      });
  };
  useEffect(() => {
    if (JSON.stringify(accountsTable) !== '{}') {
      setAccountID(Number(Object.keys(accountsTable)[0]));
    }
    if (JSON.stringify(categoriesTable) !== '{}') {
      setCategoryID(Number(Object.keys(categoriesTable)[0]));
    }
  }, [accountsTable, categoriesTable]);
  const confirmDate = (value) => {
    console.log(value);
    setDate(value);
  };
  const confirmType = (e) => {
    setTransferType(e.target.value);
  };

  return (
    <div className="create-one" style={{ width: '100%', textAlign: 'center' }}>
      <Form {...layout} layout="inline">
        <Form.Item label="Date" name="date" labelCol={{ span: 5 }} wrapperCol={{ span: 14 }}>
          <DatePicker allowClear={false} onOk={confirmDate} value={date} defaultValue={date} />
        </Form.Item>

        <Form.Item label="Account" name="account" labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}>
          <Select
            className="search-field"
            placeholder="Account"
            value={accountID}
            optionLabelProp="label"
            onChange={setAccountID}
          >
            {Object.keys(accountsTable).map((key, index) => (
              <Option key={index} value={Number(key)} label={accountsTable[key]}>
                {accountsTable[key]}
              </Option>
            ))}
          </Select>{' '}
        </Form.Item>

        <Form.Item label="Type" name="type" labelCol={{ span: 7 }} wrapperCol={{ span: 14 }}>
          <Select onChange={confirmType} value={transferType} defaultValue={transferType}>
            {Object.keys(typesTable).map((key) => (
              <Radio key={key} value={Number(key)} className="select-radio">
                {typesTable[key]}
              </Radio>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="To" name="to" labelCol={{ span: 7 }} wrapperCol={{ span: 14 }}>
          <Select
            className="search-field"
            placeholder="To Account"
            value={toAccountID}
            optionLabelProp="label"
            onChange={setToAccountID}
          >
            <Option value="" label="" />
            {Object.keys(accountsTable).map((key, index) => (
              <Option key={index} value={Number(key)} label={accountsTable[key]}>
                {accountsTable[key]}
              </Option>
            ))}
          </Select>{' '}
        </Form.Item>
        <Form.Item label="Amount" name="amount" labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}>
          <InputNumber
            value={amount}
            onChange={setAmount}
            formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
          />
        </Form.Item>
        <Form.Item label="Payee" name="payee" labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}>
          <Select
            className="search-field"
            placeholder="Payee"
            value={payeeID}
            optionLabelProp="label"
            onChange={setPayeeID}
          >
            <Option value="" label="" />
            {Object.keys(payeesTable).map((key, index) => (
              <Option key={index} value={Number(key)} label={payeesTable[key]}>
                {payeesTable[key]}
              </Option>
            ))}
          </Select>{' '}
        </Form.Item>
        <Form.Item
          label="Category"
          name="category"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 14 }}
        >
          <Select
            className="search-field"
            placeholder="Account"
            value={categoryID}
            optionLabelProp="label"
            onChange={setCategoryID}
          >
            {Object.keys(categoriesTable).map((key, index) => (
              <Option key={index} value={Number(key)} label={categoriesTable[key]}>
                {categoriesTable[key]}
              </Option>
            ))}
          </Select>{' '}
        </Form.Item>
        <Form.Item label="Note" name="note" labelCol={{ span: 4 }} wrapperCol={{ span: 14 }}>
          <Input
            value={note}
            onChange={(e) => {
              setNote(e.target.value);
            }}
            rows={3}
          />
        </Form.Item>
        <div style={{ width: '100%', textAlign: 'center' }}>
          <Button onClick={createTheTransaction} type="primary">
            Create Transaction
          </Button>{' '}
        </div>
      </Form>
    </div>
  );
}
