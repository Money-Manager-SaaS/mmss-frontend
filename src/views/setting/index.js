import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import './Setting.css';
import Account from './Sections/Account';
import Category from './Sections/Category';
import Payee from './Sections/Payee';
import { PicRightOutlined, AccountBookOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { ledgerInit } from 'api/ledger';
import { toastr } from 'react-redux-toastr';
function Setting({ ledgers, hasLedgers }) {
  const [myLedgers, setMyLedgers] = useState([]);
  const getLedger = (id) => {
    ledgerInit(id)
      .then((res) => {
        const newLedger = {
          ...res.data.data.ledger,
          trancatsions: res.data.data.trancatsions,
        };
        setMyLedgers((myLedgers) => {
          const foundIndex = myLedgers.findIndex((ledger) => ledger.id === newLedger.id);
          if (foundIndex > -1) {
            // myLedgers.splice(foundIndex, 1, newLedger);
            return myLedgers.map((one) => (one.id === newLedger.id ? newLedger : one));
          } else {
            // myLedgers.push(newLedger);
            return [...myLedgers, newLedger];
          }
          // return myLedgers;
        });
      })
      .catch((err) => {
        toastr.warning('No Content', 'Please Create Accounts');
      });
  };
  useEffect(() => {
    if (hasLedgers && ledgers[0]) {
      getLedger(ledgers[0].id);
    }
    // eslint-disable-next-line
  }, [hasLedgers]);
  return (
    <div className="main-content">
      <Tabs
        type="card"
        onChange={(e) => {
          if (myLedgers.findIndex((ledger) => ledger.id === Number(e)) === -1) {
            getLedger(e);
          }
        }}
      >
        {ledgers.map((ledgers) => (
          <Tabs.TabPane tab={<span>{ledgers.name}</span>} key={ledgers.id}>
            <OneLedgerSetting ledgerId={ledgers.id} myLedgers={myLedgers} />
          </Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  );
}

function OneLedgerSetting({ ledgerId, myLedgers }) {
  const [ledger, setLedger] = useState();

  useEffect(() => {
    setLedger(myLedgers.find((ledger) => ledger.id === ledgerId));
  }, [myLedgers, ledgerId]);
  return (
    <>
      <Tabs defaultActiveKey="1" type="card">
        <Tabs.TabPane
          tab={
            <span>
              <AccountBookOutlined />
              Accounts
            </span>
          }
          key="1"
        >
          <Account ledgerId={ledgerId} ledger={ledger} />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span>
              <PicRightOutlined />
              Categories
            </span>
          }
          key="2"
        >
          <Category ledgerId={ledgerId} ledger={ledger} />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span>
              <UsergroupAddOutlined />
              Payees
            </span>
          }
          key="3"
        >
          <Payee ledgerId={ledgerId} ledger={ledger} />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
}
export default connect((state) => state.ledger)(Setting);
