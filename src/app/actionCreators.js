import { SITENAME } from './constants';
import Api from './api';
import ActionType from './actionTypes';

const ActionCreator = {
  loadPageByName: (pageName) => ({
    type: ActionType.LOAD_PAGE_REQUEST,
    pageName,
    ...Api.getPageByName({ siteName: SITENAME, pageName }),
  }),
};

export default ActionCreator;
