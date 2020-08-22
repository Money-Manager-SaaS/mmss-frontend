import React, { useState, useEffect } from 'react';

import { Row, Col } from 'antd';

import './Overall.css';

import CreateForm from './CreateForm';
import DataTable from './DataTable';
import Search from './Search';
import withLedgers from 'components/HOC/withLedgers';
import { CreateIdNameTable } from 'utils';
function Overall({ setReGet, ledgerId, myLedgers, global_loading }) {
  const typesTable = { '-1': 'Withdraw', '0': 'Transfer', '1': 'Deposit' };

  const [transactions, setTransactions] = useState([]);
  const [accountsTable, setAccountsTable] = useState({});
  const [categoriesTable, setCategoriesTable] = useState({});
  const [payeesTable, setPayeesTable] = useState({});

  useEffect(() => {
    const ledger = myLedgers.find((ledger) => ledger.id === ledgerId);
    if (ledger) {
      setAccountsTable(CreateIdNameTable(ledger.accounts));
      setCategoriesTable(CreateIdNameTable(ledger.categories));
      setPayeesTable(CreateIdNameTable(ledger.payees));
      setTransactions((transactions) => {
        if (Array.isArray(ledger.transactions)) {
          return ledger.transactions;
        } else {
          return transactions;
        }
      });
    } else {
      setAccountsTable({});
      setCategoriesTable({});
      setPayeesTable({});
      setTransactions([]);
    }
  }, [myLedgers, ledgerId]);

  const handleShowCreate = (e) => {
    if (e.keyCode === 67 && e.ctrlKey) {
      console.log('You Press Ctrl + C put something inside.');
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleShowCreate);
    return () => {
      document.removeEventListener('keydown', handleShowCreate);
    };
  }, []);

  return (
    <div
      className="main-content"
      style={{ height: 'calc(100% - 70px)', width: 'calc(100% - 40px)' }}
    >
      <Row style={{ height: '95%', overflowY: 'scroll' }} className="data-section">
        <Col span={20} className="section-padding">
          <Search
            accountsTable={accountsTable}
            categoriesTable={categoriesTable}
            payeesTable={payeesTable}
            typesTable={typesTable}
            global_loading={global_loading}
            ledgerId={ledgerId}
            setReGet={setReGet}
          />
          <DataTable
            transactions={transactions}
            accountsTable={accountsTable}
            categoriesTable={categoriesTable}
            payeesTable={payeesTable}
            typesTable={typesTable}
            ledgerId={ledgerId}
            setReGet={setReGet}
            global_loading={global_loading}
          />
        </Col>
        <Col span={4} className="section-padding">
          <CreateForm
            ledgerId={ledgerId}
            setReGet={setReGet}
            global_loading={global_loading}
            accountsTable={accountsTable}
            categoriesTable={categoriesTable}
            payeesTable={payeesTable}
            typesTable={typesTable}
          />
        </Col>
      </Row>
    </div>
  );
}

export default withLedgers(Overall);
