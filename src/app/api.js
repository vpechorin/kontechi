function getPageByName({ siteName, pageName }) {
  return {
    payload: {
      request: {
        url: `/api/browse/sites/${siteName}/pages/${pageName}`,
        method: 'get',
      },
    },
  };
}

function getSiteByName({ siteName }) {
  return {
    payload: {
      request: {
        url: `/api/browse/sites/${siteName}`,
        method: 'get',
      },
    },
  };
}

function getSitePages({ siteName }) {
  return {
    payload: {
      request: {
        url: `/api/browse/sites/${siteName}/pages`,
        method: 'get',
      },
    },
  };
}

export default {
  getPageByName,
  getSiteByName,
  getSitePages
};
