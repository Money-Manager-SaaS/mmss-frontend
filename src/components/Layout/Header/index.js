import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { connect } from 'react-redux';
import action from 'store/action';
function Header({ ledgers, selectedLedger, select_ledger }) {
  const [key, setKey] = useState('');

  const handleClick = (e) => {
    select_ledger(Number(e.key));
  };

  useEffect(() => {
    if (selectedLedger) {
      setKey(selectedLedger.toString());
    }
  }, [selectedLedger]);
  return (
    <Menu onClick={handleClick} selectedKeys={[key]} mode="horizontal">
      {ledgers.length > 0 ? (
        ledgers.map((ledger) => <Menu.Item key={ledger.id}>{ledger.name}</Menu.Item>)
      ) : (
        <Menu.Item key={''}> </Menu.Item>
      )}
    </Menu>
  );
}
export default connect((state) => state.ledger, action.ledger)(Header);
