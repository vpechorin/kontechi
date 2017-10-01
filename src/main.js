import React from 'react';
import { render } from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import App from './modules/App';
import createStore from './app/createStore';

const initialState = {};
const history = createHistory();
const store = createStore(initialState, history);

render((
  <Provider store={store}>
    <Router history={history}>
      <App/>
    </Router>
  </Provider>
), document.getElementById('root'));
