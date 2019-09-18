import fetchMock from 'fetch-mock';

const delay = (second = 0) =>  new Promise((res, rej) => setTimeout(res, second * 1000));

export const makeFakeApi = (apiList) => {
  fetchMock.restore();
  Object.keys(apiList).forEach((key) => {
    const api = apiList[key];
    if (api.skip) {
      return;
    }
    fetchMock.mock(api.url,
      () => {  
        if (api.status === '200') {
          return api.response;
        } else {
          throw new Error('Network Error') ;
        }
      },
      {
      method: api.method || 'GET',
    });
  });
}

export const clearApis = () => {
  fetchMock.restore();
}