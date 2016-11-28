'use strict';

class apiMock {
  constructor() {
    this.endpoints = [];
  }

  get(route, handler) {
    this.endpoints.push({
      method: 'get',
      handler: handler,
      path: route,
    });
  }

  post(route, handler) {
    this.endpoints.push({
      method: 'post',
      handler: handler,
      path: route,
    });
  }

  call(method, route) {
    for (let i = 0; i < this.endpoints.length; i++) {
      if (this.endpoints[i].path === route && this.endpoints[i].method === method) {
        return this.endpoints[i].handler();
      }
    }
    throw new Error('Endpoint not found!');
  }
}

module.exports = new apiMock();
