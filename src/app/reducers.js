import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import pageService from '../modules/PageService';

function loadPage(state, action) {
  return {
    ...state,
  };
}

function loadPageSuccess(state, action) {
  const pages = { ...state.pages, [action.id]: action };
  return {
    ...state,
    pages
  };
}

function loadPageFailure(state, action) {
  return {
    ...state,
  };
}

function loadSiteSuccess(state, action) {
  return {
    ...state,
    site: action
  };
}

function loadSiteFailure(state, action) {
  return {
    ...state,
  };
}

function putPageIfNotExists(pages, page) {
  if (!pages[page.id]) pages[page.id] = page;
}

function loadSitePagesSuccess(state, payload) {
  const pages = state.pages || {};
  const updatedPages = { ...pages };
  payload.payload.data.forEach(p => putPageIfNotExists(updatedPages, p));
  return {
    ...state,
    pages: updatedPages
  };
}

function loadSitePagesFailure(state, action) {
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
  return (state, {
    payload: { data: { ...actualData } },
    meta: { previousAction: { payload, type, ...params } }
  }) => reducer(state, actualData, params);
}

export function unwrapFailureResponse(reducer) {
  return (state, { error, meta: { previousAction: { payload, type, ...params } } }) => {
    return reducer(state, error, params);
  };
}

function switchPage(state, action) {
  if (action.pageName) {
    return {
      ...state,
      activePage: action.pageName
    };
  }
  return { ...state };
}

function toggleMenu(state, action) {
  return { ...state, isMenuOpen: state.isMenuOpen ? !state.isMenuOpen : true };
}

function closeMenu(state, action) {
  return { ...state, isMenuOpen: false };
}

const reducers = {
  LOAD_PAGE_REQUEST: initRequest(loadPage),
  LOAD_PAGE_REQUEST_SUCCESS: unwrapSuccessResponse(loadPageSuccess),
  LOAD_PAGE_REQUEST_FAILURE: unwrapFailureResponse(loadPageFailure),
  LOAD_SITE_REQUEST_SUCCESS: unwrapSuccessResponse(loadSiteSuccess),
  LOAD_SITE_REQUEST_FAILURE: unwrapSuccessResponse(loadSiteFailure),
  LOAD_SITE_PAGES_REQUEST_SUCCESS: loadSitePagesSuccess,
  LOAD_SITE_PAGES_REQUEST_FAILURE: unwrapSuccessResponse(loadSitePagesFailure),
  SWITCH_PAGE: switchPage,
  TOGGLE_MENU: toggleMenu,
  CLOSE_MENU: closeMenu
};

const initialState = {
  pages: {}
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
