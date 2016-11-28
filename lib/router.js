'use strict';

const middlewares = require('../index.js').Middlewares;

function Router(api) {
  if (api) {
    return routerBase(api);
  }
  return routerBranch();
}

function routerBase(api) {
  function routerRegisterEndpoint(method, path) {
    const args = [path];
    const mws = [];
    for (let i = 2; i < arguments.length; i++) {
      mws.push(arguments[i]);
    }
    args.push(middlewares.apply(null, mws));
    return api[method].apply(api, args);
  }

  return {
    bootstrap: () => {
      return api;
    },
    get: routerRegisterEndpoint.bind(null, 'get'),
    post: routerRegisterEndpoint.bind(null, 'post'),
    put: routerRegisterEndpoint.bind(null, 'put'),
    options: routerRegisterEndpoint.bind(null, 'options'),
    delete: routerRegisterEndpoint.bind(null, 'delete'),
  };
}

function routerBranch() {
  return {

  };
}

module.exports = Router;
