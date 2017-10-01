import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import lodash from 'lodash';


export function mergePage(pages, page) {
  const others = lodash.filter(pages, p => p.id !== page.id)
  return [ ...others, ...[page] ];
}

function loadPage(state, action) {
  console.log("action xxx: ", action)
  return {
    ...state,
  };
}

function loadPageSuccess(state, action) {
  console.log("action success xxx: ", action)
  return {
    ...state,
    pages: mergePage(state.pages || [], action)
  };
}

function loadPageFailure(state, action) {
  console.log("action failure xxx: ", action)
  return {
    ...state,
  };
}

function unwrapInitRequest(state, { type, payload, ...params }) {
  return this(state, { ...params });
}

export function initRequest(reducer) {
  return unwrapInitRequest.bind(reducer);
}

unwrapInitRequest.isAxiosRequest = true;

export function unwrapSuccessResponse(reducer) {
  return (state, { payload: { data: { ...actualData } }, meta: { previousAction: { payload, type, ...params } } }) => {
    return reducer(state, actualData, params);
  };
}

export function unwrapFailureResponse(reducer) {
  return (state, { error, meta: { previousAction: { payload, type, ...params } } }) => {
    return reducer(state, error, params);
  };
}

const reducers = {
  LOAD_PAGE_REQUEST: initRequest(loadPage),
  LOAD_PAGE_REQUEST_SUCCESS: unwrapSuccessResponse(loadPageSuccess),
  LOAD_PAGE_REQUEST_FAILURE: unwrapFailureResponse(loadPageFailure),
};

const initialState = {
  pages: []
};

function reduce(state = initialState, action) {
  const actionType = action.type;
  return (actionType in reducers) ? reducers[actionType](state, action) : state;
}

const makeRootReducer = asyncReducers => combineReducers({
  routing: routerReducer,
  app: reduce,
  loadingBar: loadingBarReducer,
  ...asyncReducers,
});

export default makeRootReducer;
