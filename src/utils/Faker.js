class Faker {
  constructor() {
    self.realFetch = self.fetch;
    self.fetch = this.mockFetch;
  }
  mockFetch = function() {
    return new Promise(function(resolve) {
      resolve({ hello: 'world' });
    });
  };
}

export default new Faker();
