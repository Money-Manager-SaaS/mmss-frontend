import React from 'react';
import './Account.css';
import { connect } from 'react-redux';

function Account({ accounts }) {
  return (
    <div className="main-content">
      {accounts.map((account, index) => (
        <div key={index}>
          <div>{account.id}</div>
          <br />
          <div>{account.name}</div>
          <br />
          <br />
        </div>
      ))}
    </div>
  );
}

export default connect((state) => state.account)(Account);
