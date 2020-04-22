import React from 'react';
import './Payee.css';
import { connect } from 'react-redux';

function Payee({ payees }) {
  return (
    <div className="main-content">
      {payees.map((payee, index) => (
        <div key={index}>
          <div>{payee.id}</div>
          <br />
          <div>{payee.name}</div>
          <br />
          <br />
        </div>
      ))}
    </div>
  );
}

export default connect((state) => state.payee)(Payee);
