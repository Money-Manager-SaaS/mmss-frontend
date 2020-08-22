import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import './Setting.css';
import Account from './Sections/Account';
import Category from './Sections/Category';
import Payee from './Sections/Payee';
import { PicRightOutlined, AccountBookOutlined, UsergroupAddOutlined } from '@ant-design/icons';

import withLedgers from 'components/HOC/withLedgers';

function OneLedgerSetting({ setReGet, ledgerId, myLedgers, global_loading }) {
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
          <Account
            ledgerId={ledgerId}
            ledger={ledger}
            setReGet={setReGet}
            global_loading={global_loading}
          />
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
          <Category
            ledgerId={ledgerId}
            ledger={ledger}
            setReGet={setReGet}
            global_loading={global_loading}
          />
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
          <Payee
            ledgerId={ledgerId}
            ledger={ledger}
            setReGet={setReGet}
            global_loading={global_loading}
          />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
}
export default withLedgers(OneLedgerSetting);
