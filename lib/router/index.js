'use strict';

const middlewares = require('../index.js').Middlewares;
const RouterBranch = require('./routerBranch');

function Router(api) {
  if (api) {
    return routerBase(api);
  }
  return new RouterBranch();
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

  function routerFetchBranchEndpoints(routerBranch) {
    const routes = routerBranch.getAllRoutes();
    for (let i = 0; i < routes.length; i++) {
      api[routes[i].method](routes[i].path, routes[i].handler);
    }
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
    use: routerFetchBranchEndpoints;
  };
}

module.exports = Router;
