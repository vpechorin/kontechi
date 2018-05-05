import { applyMiddleware, createStore, compose } from 'redux';
import { routerMiddleware, syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import thunk from 'redux-thunk';
import makeRootReducer from './reducers';

import * as http from './http';

function injectReducer({ key, reducer }) {
  if (!this.asyncReducers[key]) {
    this.asyncReducers[key] = reducer;
    this.replaceReducer(this.makeRootReducer(this.asyncReducers));
  }
}

function configureStore(initialState, history) {
  const loadingBar = loadingBarMiddleware({
    promiseTypeSuffixes: ['REQUEST', 'REQUEST_SUCCESS', 'REQUEST_FAILURE'],
  });
  const middleware = [routerMiddleware(history), http.middleware, loadingBar, thunk];

  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      }) : compose;
  /* eslint-enable */

  const enhancer = composeEnhancers(
    applyMiddleware(...middleware),
    // other store enhancers if any
  );
  const store = createStore(makeRootReducer(), initialState, enhancer);
  return {
    ...store,
    injectReducer,
    makeRootReducer,
  };
}

export default (initialState = { app: { pages: [] } }, browserHistory) => {
  const store = configureStore(initialState, browserHistory);
  store.asyncReducers = {};

  // if (module.hot) {
  //   module.hot.accept('./reducers', () => {
  //     const reducers = require('./reducers').default;
  //     store.replaceReducer(reducers);
  //   });
  // }
  return store;
};
