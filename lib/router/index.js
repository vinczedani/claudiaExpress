'use strict';

const middlewares = require('../../index.js').Middlewares;
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
    args.push(middlewares.apply(api, mws));
    return api[method].apply(api, args);
  }

  function routerFetchBranchEndpoints(path, ...args) {
    function cleanArray(array) {
      const newArray = [];
      for(let i = 0; i < array.length; i++) {
        if (array[i] !== ''){
          newArray.push(array[i]);
        }
      }
      return newArray;
    }

    const mwBefore = [];
    const mwAfter = [];
    let routerBranch;

    args.map(fn => {
      if (fn instanceof RouterBranch) {
        routerBranch = fn
      } else {
        if (!routerBranch) {
          mwBefore.push(fn)
        } else {
          mwAfter.push(fn)
        }
      }
    });

    const routes = routerBranch.getAllRoutes();
    routes.map((route) => {
      const tmp = path.split('/').concat(route.path.split('/'));
      const currentPath = cleanArray(tmp).join('/');
      const args = [currentPath];

      const newHandler = [...mwBefore, ...route.handler, ...mwAfter]
      args.push(middlewares.apply(api, newHandler));
      api[route.method].apply(api, args);
    });
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
    use: routerFetchBranchEndpoints,
  };
}

module.exports = Router;
