import { SITENAME } from './constants';
import Api from './api';
import ActionType from './actionTypes';

const loadPage = pageName => ({
  type: ActionType.LOAD_PAGE_REQUEST,
  pageName,
  ...Api.getPageByName({ siteName: SITENAME, pageName }),
});

const updateActivePage = pageName => ({
  type: ActionType.SWITCH_PAGE,
  pageName
});

const loadSiteByName = () => ({
  type: ActionType.LOAD_SITE_REQUEST,
  ...Api.getSiteByName({ siteName: SITENAME }),
});

const loadSitePages = () => ({
  type: ActionType.LOAD_SITE_PAGES_REQUEST,
  ...Api.getSitePages({ siteName: SITENAME }),
});

const toggleMenu = () => ({
  type: ActionType.TOGGLE_MENU,
});

const closeMenu = () => ({
  type: ActionType.CLOSE_MENU,
});

const switchPage = (location) => {
  if (!location || !location.pathname) {
    return {
      type: ActionType.SWITCH_PAGE,
      noaction: true,
    };
  }
  const pathname = location.pathname;
  let pageName = pathname.substring(1);
  if (pathname.match(/^\/c\//)) {
    pageName = pathname.substring(3);
  }
  return function (dispatch) {
    return Promise.resolve(dispatch(updateActivePage(pageName)))
      .then(
        v => dispatch(closeMenu()),
        error => console.error(error)
      )
      .then(
        v => dispatch(loadPage(pageName)),
        error => console.error(error)
      );
  };
};

const ActionCreator = {
  loadPageByName: loadPage,
  loadSiteByName,
  loadSitePages,
  switchPage,
  updateActivePage,
  toggleMenu,
  closeMenu
};

export default ActionCreator;
