import React, { Component } from 'react';

import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import routes from './routes';
import store from './store';

import Layout from './components/Layout/Layout';

const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Layout>
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
