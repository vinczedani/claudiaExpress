'use strict';

const middlewares = require('../../index').Middlewares;

class RouterBranch {
  constructor() {
    this.routes = [];
  }

  getAllRoutes() {
    return this.routes;
  }

  get(path) {
    const mws = [];
    for (let i = 1; i < arguments.length; i++) {
      if (typeof arguments[i] !== 'function') {
        throw new Error('Wrong middleware function provided!');
      }
      mws.push(arguments[i]);
    }
    const handler = middlewares.apply(null, mws);
    this.routes.push({
      method: 'get',
      path: path,
      handler: handler,
    });
  }

  post(path) {
    const mws = [];
    for (let i = 1; i < arguments.length; i++) {
      mws.push(arguments[i]);
    }
    const handler = middlewares.apply(null, mws);
    this.routes.push({
      method: 'post',
      path: path,
      handler: handler,
    });
  }

  put(path) {
    const mws = [];
    for (let i = 1; i < arguments.length; i++) {
      mws.push(arguments[i]);
    }
    const handler = middlewares.apply(null, mws);
    this.routes.push({
      method: 'put',
      path: path,
      handler: handler,
    });
  }

  options(path) {
    const mws = [];
    for (let i = 1; i < arguments.length; i++) {
      mws.push(arguments[i]);
    }
    const handler = middlewares.apply(null, mws);
    this.routes.push({
      method: 'options',
      path: path,
      handler: handler,
    });
  }

  delete(path) {
    const mws = [];
    for (let i = 1; i < arguments.length; i++) {
      mws.push(arguments[i]);
    }
    const handler = middlewares.apply(null, mws);
    this.routes.push({
      method: 'delete',
      path: path,
      handler: handler,
    });
  }

  use(otherBranch) {
    const routes = otherBranch.getAllRoutes();
    this.routes.concat(routes);
  }
}

module.exports = RouterBranch;
