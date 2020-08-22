import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import React, { Component, useEffect } from 'react';
import ReduxToastr, { toastr } from 'react-redux-toastr';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { Provider, connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import action from 'store/action';
import routes, { loginRoutes } from 'routes';
import store from 'store';
import GlobalLoading from 'components/GlobalLoading';
import Layout from 'components/Layout/Layout';
import { refreshAccessToken, axios } from 'api';
import { getLedgers } from 'api/ledger';

const history = createBrowserHistory();

function GetAccount({
  change_auth,
  get_accounts,
  get_categories,
  get_payees,
  refreshToken,
  get_ledgers,
}) {
  useEffect(() => {
    //for async await add async here
    async function runApp() {
      if (!!refreshToken) {
        try {
          const tokenRes = await refreshAccessToken({ refreshToken });
          axios.defaults.headers.common['Authorization'] = tokenRes.data.accessToken;
          const ledgersRes = await getLedgers();
          if (Array.isArray(ledgersRes.data) && ledgersRes.data.length > 0) {
            get_ledgers(ledgersRes.data);
            toastr.success('Get Ledgers');
          } else {
            toastr.error('Error');
          }
        } catch (err) {
          toastr.error('Error');
        }
      }
    }
    runApp();
  }, [change_auth, get_accounts, get_categories, get_payees, refreshToken, get_ledgers]);

  const LoginPages = () => (
    <Switch>
      {loginRoutes.map((route, index) => (
        <Route exact key={index} path={route.path} component={route.component} />
      ))}
      <Redirect to="/login" />
    </Switch>
  );

  const AuthPages = () => (
    <Layout>
      <Switch>
        {routes.map((route, index) => (
          <Route exact key={index} path={route.path} component={route.component} />
        ))}
        <Redirect to="/" />
      </Switch>
    </Layout>
  );

  return (
    <ConnectedRouter history={history}>
      {!!refreshToken ? <AuthPages /> : <LoginPages />}
    </ConnectedRouter>
  );
}

const ConnectGetAccount = connect((state) => ({ refreshToken: state.user.refreshToken }), {
  get_accounts: action.account.get_accounts,
  get_categories: action.category.get_categories,
  change_auth: action.user.change_auth,
  get_payees: action.payee.get_payees,
  get_ledgers: action.ledger.get_ledgers,
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
        <ReduxToastr
          position="bottom-center"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          timeOut={1200}
        />
      </Provider>
    );
  }
}

export default App;
