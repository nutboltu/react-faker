class Faker {
  constructor(apiList) {
    self.realFetch = self.fetch;
    self.fetch = this.mockFetch;
    this.apiList = apiList;
  }

  add = api => {
    this.apiList.push(api);
  };

  matchMock = () => {
    return false;
  };

  mockFetch = (req, options) => {
    if (this.matchMock()) {
      return new Promise(function(resolve) {
        resolve({ hello: 'world' });
      });
    }
    return self.realFetch(req, options);
  };

  restore = () => {
    this.apiList = [];
  };
}

export default new Faker();
