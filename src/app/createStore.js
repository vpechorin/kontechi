import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import makeRootReducer from './reducers';

import * as http from './http';

function injectReducer({ key, reducer }) {
  if (!this.asyncReducers[key]) {
    this.asyncReducers[key] = reducer;
    this.replaceReducer(this.makeRootReducer(this.asyncReducers));
  }
}

function configureStore(initialState, history) {
  console.log('execute configureStore');
  const loadingBar = loadingBarMiddleware({
    promiseTypeSuffixes: ['REQUEST', 'REQUEST_SUCCESS', 'REQUEST_FAILURE'],
  });
  const middleware = [routerMiddleware(history), http.middleware, loadingBar];

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

export default (initialState = {}, history) => {
  console.log('configure store, initialState: ', initialState);
  const store = configureStore(initialState, history);
  store.asyncReducers = {};
  console.log('empty asyncReducers');

  // if (module.hot) {
  //   module.hot.accept('./reducers', () => {
  //     const reducers = require('./reducers').default;
  //     store.replaceReducer(reducers);
  //   });
  // }
  return store;
};
