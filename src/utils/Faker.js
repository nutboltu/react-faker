class Faker {
    constructor() {
        self.realFetch = self.fetch;
        self.fetch = this.mockFetch;
    }
    mockFetch = function(url, options)  {
        return new Promise(function (resolve, reject) {
            resolve({ hello: 'world' });
        });
    }
}

export default new Faker();