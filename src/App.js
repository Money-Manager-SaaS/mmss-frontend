import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import React, { Component, useEffect } from 'react';
import ReduxToastr from 'react-redux-toastr';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { Provider, connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import action from '@/store/action';
import routes from './routes';
import store from './store';
import GlobalLoading from './components/GlobalLoading';
import Layout from './components/Layout/Layout';
import { mockGetUser } from './api/user';
import { setEmail, removeEmail, getEmail } from './utils';
import { toastr } from 'react-redux-toastr';
const history = createBrowserHistory();

function GetAccount({ change_auth, get_accounts, get_categories, get_payees, children }) {
  useEffect(() => {
    console.log('Getting user account');
    // if (!!getEmail()) {
    mockGetUser()
      .then((data) => {
        if (data.status === 200) {
          setEmail(data.data.email);
          change_auth({ email: data.data.email, auth: true });
          get_accounts(data.data.accounts);
          get_categories(data.data.categories);
          get_payees(data.data.payees);
        } else if (data.status === 401) {
          //No Auth
          removeEmail();
          change_auth({ email: '', auth: false });
          get_accounts([]);
          get_categories([]);
          toastr.error('Error', 'Not Get User Info');
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // }
  }, [change_auth, get_accounts, get_categories, get_payees]);
  return <>{children}</>;
}

const ConnectGetAccount = connect(null, {
  get_accounts: action.account.get_accounts,
  get_categories: action.category.get_categories,
  change_auth: action.user.change_auth,
  get_payees: action.payee.get_payees,
})(GetAccount);

function Root({ globalLoading }) {
  return (
    <>
      <GlobalLoading loading={globalLoading} />
      <ConnectedRouter history={history}>
        <Layout>
          <Switch>
            {routes.map((route, index) => (
              <Route exact key={index} path={route.path} component={route.component} />
            ))}
          </Switch>
        </Layout>
      </ConnectedRouter>
    </>
  );
}

const ConnectGlobalLoading = connect((state) => state.globalLoading, action.globalLoading)(Root);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectGetAccount>
          <ConnectGlobalLoading />
          <ReduxToastr position="bottom-center" transitionIn="fadeIn" transitionOut="fadeOut" />
        </ConnectGetAccount>
      </Provider>
    );
  }
}

export default App;
