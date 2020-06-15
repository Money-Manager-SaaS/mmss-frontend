import React, { useState, useEffect, useRef } from 'react';

import { toastr } from 'react-redux-toastr';
import { Button, DatePicker, Select, Input } from 'antd';

import './Search.css';
import moment from 'moment';

import { getTransactions } from 'api/transaction';

const { Option } = Select;
const { RangePicker } = DatePicker;

let firstTimeLoad = true;

export default function Search({
  setTransactions,
  accountsTable,
  categoriesTable,
  payeesTable,
  typesTable,
  global_loading,
}) {
  const [dateFrom, setDateFrom] = useState(moment().subtract(1, 'month'));
  const [dateTo, setDateTo] = useState(moment());
  const [account, setAccount] = useState();
  const [type, setType] = useState();
  const [payees, setPayees] = useState([]);
  const [categories, setCategories] = useState([]);
  const [note, setNote] = useState('');
  const noteRef = useRef();

  function confirmSearchPayee(value) {
    setPayees(value);
  }

  function confirmSearchNote(e) {
    setNote(e.target.value);
  }

  function confirmSearchCategories(value) {
    setCategories(value);
  }

  function confirmSearchAccount(value) {
    setAccount(value);
  }

  function confirmSearchType(value) {
    setType(value);
  }

  function confirmSearchDate(value) {
    setDateFrom(value[0]);
    setDateTo(value[1]);
  }

  useEffect(() => {
    if (firstTimeLoad) {
      global_loading();
      getTransactions()
        .then((data) => {
          if (data.status === 200) {
            setTransactions(data.data.transactions);
          } else {
            toastr.warning('Opps', 'Not Get Transactions');
          }
          global_loading(false);
        })
        .catch((err) => {
          toastr.error('Error', 'Not Get Transactions');
          global_loading(false);
          console.log(err);
        });
      firstTimeLoad = false;
    } else {
      const currentNote = noteRef.current.input.input.value;
      const timmer = setTimeout(() => {
        if (currentNote === note) {
          const data = { dateFrom, dateTo, payees, categories, type, account, note };
          console.log('Searching', data);
          // getTransactions(data).then(data=>setTransactions(data.data))
        }
      }, 500);
      return () => {
        clearTimeout(timmer);
      };
    }
  }, [dateFrom, dateTo, payees, categories, type, account, note, global_loading, setTransactions]);

  useEffect(
    () => () => {
      firstTimeLoad = true;
    },
    []
  );

  return (
    <div className="section-search">
      <ul>
           <li style={{display: "inline-block"}}>
               <RangePicker
                allowClear={false}
                style={{ maxWidth: 300}}
                format="MM-DD-YYYY"
                onOk={confirmSearchDate}
                value={[dateFrom, dateTo]}
                showTime={{
                  defaultValue: moment('00:00:00', 'HH:mm:ss'),
                }}
              />
          </li>
          <li style={{display: "inline-block"}}>
              <Select
                className="search-field"
                style={{ minWidth: 130 }}
                placeholder="Account"
                value={account}
                onChange={confirmSearchAccount}
                optionLabelProp="label"
              >
                <Option value={''} label={''}></Option>
                {Object.keys(accountsTable).map((key, index) => (
                  <Option key={index} value={key} label={accountsTable[key]}>
                    {accountsTable[key]}
                  </Option>
                ))}
              </Select>
          </li>
          <li style={{display: "inline-block"}}>
              <Select
                className="search-field"
                style={{ minWidth: 130 }}
                placeholder="Type"
                value={type}
                onChange={confirmSearchType}
                optionLabelProp="label"
              >
                <Option value={''} label={''}></Option>
                {Object.keys(typesTable).map((key, index) => (
                  <Option key={index} value={key} label={typesTable[key]}>
                    {typesTable[key]}
                  </Option>
                ))}
              </Select>
          </li>
          <li style={{display: "inline-block"}}>
              <Select
                className="search-field"
                mode="multiple"
                style={{ minWidth: 130 }}
                placeholder="Payees"
                onChange={confirmSearchPayee}
                optionLabelProp="label"
                value={payees}
              >
                {Object.keys(payeesTable).map((key, index) => (
                  <Option key={index} value={key} label={payeesTable[key]}>
                    {payeesTable[key]}
                  </Option>
                ))}
              </Select>
          </li>
          <li style={{display: "inline-block"}}>
              <Select
                mode="multiple"
                className="search-field"
                style={{ minWidth: 130 }}
                placeholder="Categories"
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
          </li>
          <li style={{display: "inline-block"}}>
              <Input.Search
                ref={noteRef}
                value={note}
                onChange={confirmSearchNote}
                className="search-field"
                style={{ maxWidth: 120 }}
              />
          </li>
          <li style={{display: "inline-block"}}>
          <Button type="primary" onClick={() => {}}>
            CLEAR ALL
          </Button>
          </li>
      </ul>
    </div>
  );
}
