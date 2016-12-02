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
    this.routes.push({
      method: 'get',
      path: path,
      handler: mws,
    });
  }

  post(path) {
    const mws = [];
    for (let i = 1; i < arguments.length; i++) {
      mws.push(arguments[i]);
    }
    this.routes.push({
      method: 'post',
      path: path,
      handler: mws,
    });
  }

  put(path) {
    const mws = [];
    for (let i = 1; i < arguments.length; i++) {
      mws.push(arguments[i]);
    }
    this.routes.push({
      method: 'put',
      path: path,
      handler: mws,
    });
  }

  options(path) {
    const mws = [];
    for (let i = 1; i < arguments.length; i++) {
      mws.push(arguments[i]);
    }
    this.routes.push({
      method: 'options',
      path: path,
      handler: mws,
    });
  }

  delete(path) {
    const mws = [];
    for (let i = 1; i < arguments.length; i++) {
      mws.push(arguments[i]);
    }
    this.routes.push({
      method: 'delete',
      path: path,
      handler: mws,
    });
  }

  use(path, otherBranch) {
    function cleanArray(array) {
      const newArray = [];
      for(let i = 0; i < array.length; i++) {
        if (array[i] !== ''){
          newArray.push(array[i]);
        }
      }
      return newArray;
    }

    const routes = otherBranch.getAllRoutes();
    const array = routes.map((route) => {
      const tmp = path.split('/').concat(route.path.split('/'));
      route.path = cleanArray(tmp).join('/');
      return route;
    });
    this.routes.concat(array);
  }
}

module.exports = RouterBranch;
