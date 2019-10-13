import fetchMock from 'fetch-mock';

export const makeFakeApi = apiList => {
  fetchMock.restore();
  Object.keys(apiList).forEach(key => {
    const api = apiList[key];
    if (api.skip) {
      return;
    }
    fetchMock.mock(
      api.url,
      () => {
        if (api.status === '200') {
          return api.response;
        } else {
          throw new Error({ error: 'Network Error' });
        }
      },
      {
        method: api.method || 'GET',
      }
    );
  });
};

export const clearApis = () => {
  fetchMock.restore();
};
