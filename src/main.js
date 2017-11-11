import React from 'react';
import { render } from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import App from './modules/App';
import ActionCreator from './app/actionCreators';
import createStore from './app/createStore';

const initialState = {};
const browserHistory = createHistory();
const store = createStore(initialState, browserHistory);
const history = syncHistoryWithStore(browserHistory, store)
history.listen(location => store.dispatch(ActionCreator.switchPage(location)));

render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <App store={store}/>
    </Router>
  </Provider>
), document.getElementById('root'));
