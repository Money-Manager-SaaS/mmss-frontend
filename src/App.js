import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import React, { Component, useEffect } from 'react';
import ReduxToastr, { toastr } from 'react-redux-toastr';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { Provider, connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import action from '@/store/action';
import { Layout } from 'antd';
import routes, { loginRoutes } from './routes';
import store from './store';
import GlobalLoading from './components/GlobalLoading';
import { mockGetUser } from './api/user';
import { setEmail, removeEmail, getEmail } from './utils';

import SideBar from './components/SideBar/SideBar';
import UserInfo from './components/UserInfo/UserInfo';

const history = createBrowserHistory();

function GetAccount({ change_auth, get_accounts, get_categories, get_payees, auth }) {
  useEffect(() => {
    console.log('Getting user account');
    if (auth || !!getEmail()) {
      mockGetUser()
        .then((data) => {
          if (data.status === 200) {
            setEmail(data.data.email);
            change_auth({ email: data.data.email, auth: true });
            get_accounts(data.data.accounts);
            get_categories(data.data.categories);
            get_payees(data.data.payees);
          } else if (data.status === 401) {
            // No Auth
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
    }
  }, [change_auth, get_accounts, get_categories, get_payees, auth]);

  const LoginPages = () => (
    <Switch>
      {loginRoutes.map((route, index) => (
        <Route exact key={index} path={route.path} component={route.component} />
      ))}
      <Redirect to="/login" />
    </Switch>
  );

  const AuthPages = () => (
    <Layout style={{ minHeight: '100vh', backgroundColor: 'rgb(240, 242, 245)' }}>
      <SideBar />
      <UserInfo />
      <div>
        <Switch>
          {routes.map((route, index) => (
            <Route exact key={index} path={route.path} component={route.component} />
          ))}
          <Redirect to="/" />
        </Switch>
      </div>
    </Layout>
  );

  return (
    <ConnectedRouter history={history}>{auth ? <AuthPages /> : <LoginPages />}</ConnectedRouter>
  );
}

const ConnectGetAccount = connect((state) => ({ auth: state.user.auth }), {
  get_accounts: action.account.get_accounts,
  get_categories: action.category.get_categories,
  change_auth: action.user.change_auth,
  get_payees: action.payee.get_payees,
})(GetAccount);

function Root({ globalLoading, auth }) {
  return <GlobalLoading loading={globalLoading} />;
}

const ConnectGlobalLoading = connect(
  (state) => ({ globalLoading: state.globalLoading.globalLoading, auth: state.user.auth }),
  action.globalLoading
)(Root);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectGlobalLoading />
        <ConnectGetAccount />

        <ReduxToastr position="bottom-center" transitionIn="fadeIn" transitionOut="fadeOut" />
      </Provider>
    );
  }
}

export default App;
