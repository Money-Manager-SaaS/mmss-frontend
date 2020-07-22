import React, { useState, useEffect } from 'react';
import './Account.css';
import { connect } from 'react-redux';
import { createAccount, updateAccount, deleteAccount } from 'api/account';
import { toastr } from 'react-redux-toastr';
import action from 'store/action';
function Account(props) {
  const { add_account, delete_account, global_loading, update_account, ledgerId, ledger } = props;

  const [accounts, setAccounts] = useState([]);
  const [currency, setCurrency] = useState('');
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [theAccount, setTheAccount] = useState({});
  useEffect(() => {
    if (ledger && ledger.accounts) {
      console.log(ledger.accounts, Array.isArray(ledger.accounts));
      setAccounts(ledger.accounts);
    }
  }, [ledger]);
  const createNewAccount = () => {
    if (name === '' || currency === '') {
      toastr.warning('Failed', 'Name and Currency is required');
      return;
    }
    const data = { name, currency, amount: isNaN(amount) ? 0 : amount };
    global_loading();
    createAccount(data, ledgerId)
      .then((res) => {
        if (res.status === 200) {
          add_account(res.data);
          setCurrency('');
          setAmount('');
          setName('');
          toastr.success('OK', 'Create Account Successfully');
        } else {
          toastr.warning('Failed', 'Create Account Failed');
        }
        global_loading(false);
      })
      .catch((err) => {
        console.log(err);
        global_loading(false);
        toastr.error('Error', 'Error');
      });
  };

  const deleteTheAccount = (id) => {
    global_loading();
    const data = { id };
    deleteAccount(data)
      .then((res) => {
        console.log(res.status === 200);
        if (res.status === 200) {
          delete_account(id);
          toastr.success('OK', 'Delete Account Successfully');
        } else {
          toastr.warning('Failed', 'Delete Account Failed');
        }
        global_loading(false);
      })
      .catch((err) => {
        console.log(err);
        global_loading(false);
        toastr.error('Error', 'Error');
      });
  };

  const updateTheAccount = () => {
    if (theAccount.name === '') {
      toastr.warning('Failed', 'Name is required');
      return;
    }
    global_loading();
    const data = theAccount;
    updateAccount(data)
      .then((res) => {
        console.log(res.status === 200);
        if (res.status === 200) {
          update_account(data);
          setTheAccount({});
          toastr.success('OK', 'Update Account Successfully');
        } else {
          toastr.warning('Failed', 'Update Account Failed');
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
      {accounts.map((account, index) => (
        <div key={index}>
          <div>
            {account.id}
            <button
              onClick={() => {
                deleteTheAccount(account.id);
              }}
              style={{ marginLeft: 10 }}
            >
              Delete
            </button>
          </div>
          <br />
          <div style={{ visibility: account.id === theAccount.id ? 'hidden' : 'visible' }}>
            {account.name}
            <br />
            {/* {account.currency}
            <br /> */}
            {account.amount}
            <button
              onClick={() => {
                setTheAccount(account);
              }}
              style={{ marginLeft: 10 }}
            >
              Update
            </button>
          </div>
          <div style={{ visibility: account.id === theAccount.id ? 'visible' : 'hidden' }}>
            <input
              placeholder={'Name'}
              value={theAccount.name ? theAccount.name : ''}
              onChange={(e) => {
                setTheAccount({ ...theAccount, name: e.target.value });
              }}
            />
            <input
              placeholder={'Currency'}
              value={theAccount.currency ? theAccount.currency : ''}
              onChange={(e) => {
                setTheAccount({ ...theAccount, currency: e.target.value });
              }}
            />
            <input
              placeholder={'Amount'}
              value={theAccount.amount ? theAccount.amount : ''}
              onChange={(e) => {
                setTheAccount({ ...theAccount, amount: e.target.value });
              }}
            />

            <button onClick={updateTheAccount} style={{ marginLeft: 10 }}>
              Save
            </button>
            <button
              onClick={() => {
                setTheAccount({});
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
        placeholder={'Name'}
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <input
        placeholder={'Currency'}
        value={currency}
        onChange={(e) => {
          setCurrency(e.target.value);
        }}
      />
      <input
        placeholder={'Amount'}
        type="number"
        value={amount}
        onChange={(e) => {
          setAmount(e.target.value);
        }}
      />
      <button onClick={createNewAccount}>Create Account</button>
    </div>
  );
}

export default connect((state) => state.account, { ...action.account, ...action.globalLoading })(
  Account
);
