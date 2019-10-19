class Faker {
  constructor(apiList) {
    self.realFetch = self.fetch;
    self.fetch = this.mockFetch;
    this.apiList = apiList || {};
  }

  getKey = (url, method) => `${url}_${method}`;

  getApis = () => Object.values(this.apiList);

  makeInitialApis = apis => {
    if (!Array.isArray(apis)) {
      this.apiList = {};
    }
    this.apiList = apis.reduce((acc, cur) => {
      const key = this.getKey(cur.url, cur.method);
      acc[key] = {
        ...cur,
        skip: false,
      };
      return acc;
    }, {});
  };

  add = api => {
    const key = this.getKey(api.url, api.method);
    this.apiList[key] = api;
  };

  setSkip = (url, method) => {
    const key = this.getKey(url, method);
    console.log(this.apiList);
    this.apiList[key].skip = !this.apiList[key].skip;
  };

  matchMock = (url, method) => {
    const key = this.getKey(url, method);
    if (this.apiList[key] && !this.apiList[key].skip){
      return this.apiList[key];
    }
    return null;
  };

  mockFetch = (url, options) => {
    const { method } = options || {};
    const matched = this.matchMock(url, method);
    if (matched) {
      return new Promise(function(resolve) {
        resolve(matched.response);
      });
    }
    return self.realFetch(url, options);
  };

  restore = () => {
    this.apiList = {};
  };
}

export default Faker;
