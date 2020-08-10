import React, { useState } from 'react';
import './Ledger.css';
import { connect } from 'react-redux';
import { createLedger, updateLedger, deleteLedger } from 'api/ledger';

import { toastr } from 'react-redux-toastr';
import action from 'store/action';
function Ledger(props) {
  const { ledgers, add_ledger, delete_ledger, global_loading, update_ledger } = props;

  const [name, setName] = useState('');
  const [theLedger, setTheLedger] = useState({});
  const createNewLedger = () => {
    if (name === '') {
      toastr.warning('Failed', 'Name is required');
      return;
    }
    const data = { name };
    global_loading();
    createLedger(data)
      .then((res) => {
        if (res.status === 200) {
          add_ledger(res.data);
          setName('');
          toastr.success('OK', 'Create Ledger Successfully');
        } else {
          toastr.warning('Failed', 'Create Ledger Failed');
        }
        global_loading(false);
      })
      .catch((err) => {
        console.log(err);
        global_loading(false);
        toastr.error('Error', 'Error');
      });
  };

  const deleteTheLedger = (id) => {
    global_loading();
    const data = { id };
    deleteLedger(data)
      .then((res) => {
        console.log(res.status === 200);
        if (res.status === 200) {
          delete_ledger(id);
          toastr.success('OK', 'Delete Ledger Successfully');
        } else {
          toastr.warning('Failed', 'Delete Ledger Failed');
        }
        global_loading(false);
      })
      .catch((err) => {
        console.log(err);
        global_loading(false);
        toastr.error('Error', 'Error');
      });
  };

  const updateTheLedger = () => {
    if (theLedger.name === '') {
      toastr.warning('Failed', 'Name is required');
      return;
    }
    global_loading();
    const data = theLedger;
    updateLedger(data)
      .then((res) => {
        console.log(res.status === 200);
        if (res.status === 200) {
          update_ledger(data);
          setTheLedger({});
          toastr.success('OK', 'Update Ledger Successfully');
        } else {
          toastr.warning('Failed', 'Update Ledger Failed');
        }
        global_loading(false);
      })
      .catch((err) => {
        console.log(err);
        global_loading(false);
        toastr.error('Error', 'Error');
      });
  };

  return (
    <div className="main-content">
      {ledgers.map((ledger, index) => (
        <div key={index}>
          <div>
            {ledger.id}
            <button
              onClick={() => {
                deleteTheLedger(ledger.id);
              }}
              style={{ marginLeft: 10 }}
            >
              Delete
            </button>
          </div>
          <br />
          <div style={{ visibility: ledger.id === theLedger.id ? 'hidden' : 'visible' }}>
            {ledger.name}
            <button
              onClick={() => {
                setTheLedger(ledger);
              }}
              style={{ marginLeft: 10 }}
            >
              Update
            </button>
          </div>
          <div style={{ visibility: ledger.id === theLedger.id ? 'visible' : 'hidden' }}>
            <input
              placeholder="Name"
              value={theLedger.name ? theLedger.name : ''}
              onChange={(e) => {
                setTheLedger({ ...theLedger, name: e.target.value });
              }}
            />

            <button onClick={updateTheLedger} style={{ marginLeft: 10 }}>
              Save
            </button>
            <button
              onClick={() => {
                setTheLedger({});
              }}
              style={{ marginLeft: 5 }}
            >
              Cancel
            </button>
          </div>
          <br />
        </div>
      ))}
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <button onClick={createNewLedger}>Create Ledger</button>
    </div>
  );
}

export default connect((state) => state.ledger, { ...action.ledger, ...action.globalLoading })(
  Ledger
);
