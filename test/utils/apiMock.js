'use strict';

class apiMock {
  constructor() {
    this.endpoints = [];

    this.ApiResponse = function(body, headers, status) {
      return {
        body: body,
        headers: headers,
        status: status,
      };
    }
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

  put(route, handler) {
    this.endpoints.push({
      method: 'put',
      handler: handler,
      path: route,
    });
  }

  delete(route, handler) {
    this.endpoints.push({
      method: 'delete',
      handler: handler,
      path: route,
    });
  }

  options(route, handler) {
    this.endpoints.push({
      method: 'options',
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
    console.log(method, route);
    console.log(this.endpoints);
    throw new Error('Endpoint not found!');
  }
}

module.exports = apiMock;
