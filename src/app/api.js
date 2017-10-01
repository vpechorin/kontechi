function getPageByName({ siteName, pageName }) {
  return {
    payload: {
      request: {
        url: `/browse/sites/${siteName}/pages/${pageName}`,
        method: 'get',
      },
    },
  };
}

export default {
  getPageByName,
};
