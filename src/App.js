import React, { Component, useEffect } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { Provider, connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import action from '@/store/action';
import routes from './routes';
import store from './store';

import Layout from './components/Layout/Layout';

const history = createBrowserHistory();

function GetAccount({ get_accounts }) {
  useEffect(() => {
    get_accounts();
  }, [get_accounts]);
  return <></>;
}

const ConnectGetAccount = connect(null, action.account)(GetAccount);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Layout>
            <ConnectGetAccount />
            <Switch>
              {routes.map((route, index) => (
                <Route exact key={index} path={route.path} component={route.component} />
              ))}
            </Switch>
          </Layout>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
