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
import action from 'store/action';
function Setting({ selectedLedger, global_loading }) {
  const [myLedgers, setMyLedgers] = useState([]);
  const [reGet, setReGet] = useState(0);
  const getLedger = (id) => {
    global_loading();
    ledgerInit(id)
      .then((res) => {
        const newLedger = {
          ...res.data.data.ledger,
          trancatsions: res.data.data.trancatsions,
        };
        global_loading(false);
        setMyLedgers((myLedgers) => {
          const foundIndex = myLedgers.findIndex((ledger) => ledger.id === newLedger.id);
          if (foundIndex > -1) {
            return myLedgers.map((one) => (one.id === newLedger.id ? newLedger : one));
          } else {
            return [...myLedgers, newLedger];
          }
        });
      })
      .catch((err) => {
        global_loading(false);
        toastr.warning('No Content', 'Please Create Accounts');
      });
  };
  useEffect(() => {
    if (selectedLedger) {
      getLedger(selectedLedger);
    }
    // eslint-disable-next-line
  }, [selectedLedger, reGet]);
  return (
    <div className="main-content">
      <OneLedgerSetting setReGet={setReGet} ledgerId={selectedLedger} myLedgers={myLedgers} />
    </div>
  );
}

function OneLedgerSetting({ setReGet, ledgerId, myLedgers }) {
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
          <Account ledgerId={ledgerId} ledger={ledger} setReGet={setReGet} />
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
          <Category ledgerId={ledgerId} ledger={ledger} setReGet={setReGet} />
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
          <Payee ledgerId={ledgerId} ledger={ledger} setReGet={setReGet} />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
}
export default connect((state) => state.ledger, action.globalLoading)(Setting);
