import React, { useState, useEffect } from 'react';
import './Payee.css';
import { connect } from 'react-redux';
import { createPayee, updatePayee, deletePayee } from 'api/payee';
import { toastr } from 'react-redux-toastr';
import action from 'store/action';
function Payee(props) {
  const { setReGet, global_loading, ledgerId, ledger } = props;

  const [payees, setPayees] = useState([]);

  useEffect(() => {
    if (ledger && ledger.payees) {
      setPayees(ledger.payees);
    }
  }, [ledger]);

  const [name, setName] = useState('');
  const [thePayee, setThePayee] = useState({});
  const createNewPayee = () => {
    if (name === '') {
      toastr.warning('Failed', 'Name is required');
      return;
    }
    const data = { ledgerId, name };
    global_loading();
    createPayee(data)
      .then((res) => {
        if (res.status === 200) {
          setReGet((reGet) => reGet + 1);
          setName('');
          toastr.success('OK', 'Create Payee Successfully');
        } else {
          toastr.warning('Failed', 'Create Payee Failed');
          global_loading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        global_loading(false);
        toastr.error('Error', 'Error');
      });
  };

  const deleteThePayee = (id) => {
    global_loading();
    const data = { ledgerId, id };
    deletePayee(data)
      .then((res) => {
        console.log(res.status === 200);
        if (res.status === 200) {
          setReGet((reGet) => reGet + 1);
          toastr.success('OK', 'Delete Payee Successfully');
        } else {
          toastr.warning('Failed', 'Delete Payee Failed');
          global_loading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        global_loading(false);
        toastr.error('Error', 'Error');
      });
  };

  const updateThePayee = () => {
    if (thePayee.name === '') {
      toastr.warning('Failed', 'Name is required');
      return;
    }
    global_loading();
    const data = thePayee;
    data.ledgerId = ledgerId;
    updatePayee(data)
      .then((res) => {
        console.log(res.status === 200);
        if (res.status === 200) {
          setReGet((reGet) => reGet + 1);
          setThePayee({});
          toastr.success('OK', 'Update Payee Successfully');
        } else {
          toastr.warning('Failed', 'Update Payee Failed');
          global_loading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        global_loading(false);
        toastr.error('Error', 'Error');
      });
  };

  return (
    <div style={{ height: 500, overflowY: 'scroll' }} className="main-content">
      {!!ledger &&
        payees.map((payee, index) => (
          <div key={index}>
            <div>
              {payee.id}
              <button
                onClick={() => {
                  deleteThePayee(payee.id);
                }}
                style={{ marginLeft: 10 }}
              >
                Delete
              </button>
            </div>
            <br />
            <div style={{ visibility: payee.id === thePayee.id ? 'hidden' : 'visible' }}>
              {payee.name}
              <button
                onClick={() => {
                  setThePayee(payee);
                }}
                style={{ marginLeft: 10 }}
              >
                Update
              </button>
            </div>
            <div style={{ visibility: payee.id === thePayee.id ? 'visible' : 'hidden' }}>
              <input
                placeholder="Name"
                value={thePayee.name ? thePayee.name : ''}
                onChange={(e) => {
                  setThePayee({ ...thePayee, name: e.target.value });
                }}
              />

              <button onClick={updateThePayee} style={{ marginLeft: 10 }}>
                Save
              </button>
              <button
                onClick={() => {
                  setThePayee({});
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
      <button onClick={createNewPayee}>Create Payee</button>
    </div>
  );
}

export default connect(null, action.globalLoading)(Payee);
