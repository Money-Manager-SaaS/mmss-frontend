import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ledgerInit } from 'api/ledger';
import { toastr } from 'react-redux-toastr';
import action from 'store/action';

export default (OriginalComponent) => {
  function WithLedgers({ selectedLedger, global_loading }) {
    const [myLedgers, setMyLedgers] = useState([]);
    const [reGet, setReGet] = useState(0);
    const getLedger = (id) => {
      global_loading();
      ledgerInit(id)
        .then((res) => {
          const newLedger = {
            ...res.data.data.ledger,
            transactions: res.data.data.transactions,
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
          setMyLedgers((myLedgers) => myLedgers);
          toastr.warning('No Content', 'Please Create Accounts');
        });
    };
    useEffect(() => {
      if (selectedLedger && myLedgers.findIndex((ledger) => ledger.id === selectedLedger) === -1) {
        getLedger(selectedLedger);
      }
      // eslint-disable-next-line
    }, [selectedLedger]);

    useEffect(() => {
      if (selectedLedger && reGet !== 0) {
        getLedger(selectedLedger);
      }
      // eslint-disable-next-line
    }, [selectedLedger, reGet]);
    return (
      <div className="main-content">
        <OriginalComponent
          setReGet={setReGet}
          ledgerId={selectedLedger}
          myLedgers={myLedgers}
          global_loading={global_loading}
        />
      </div>
    );
  }

  return connect((state) => state.ledger, action.globalLoading)(WithLedgers);
};
