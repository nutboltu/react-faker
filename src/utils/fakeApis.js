import fetchMock from 'fetch-mock';

export const makeFakeApi = (apiList) => {
  fetchMock.restore();
  Object.keys(apiList).forEach((key) => {
    const api = apiList[key];
    fetchMock.mock(api.url,
      // () => ({userId: 1,id: 1,title: 'mor',completed: true}),
      () => {  
        if (api.status === '200') {
          return {userId: 1,id: 1,title: 'mor',completed: true};
        } else {
          throw new Error('a') ;
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