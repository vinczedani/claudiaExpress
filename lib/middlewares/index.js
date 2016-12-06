'use strict';

const createRes = require('./res');
let ErrorHandler;

function Middlewares() {
  const args = arguments;
  const ApiResponse = this && this.ApiResponse;
  return (req) => {
    return new Promise((resolve, reject) => {
      const res = createRes(ApiResponse, resolve, reject);

      callMiddleWare(args, 0, req, res);
    });
  }
}

function callMiddleWare(mws, number, req, res) {
  if (!mws[number]) {
    throw new Error('You called next() when there is no more middleware left!');
  }
  if (typeof mws[number] !== 'function') {
    throw new Error('The provided middleware is not a function!');
  }
  if (number === 0) {
    findErrorHanler(mws);
  }
  function next(err) {
    if (err) {
      if (ErrorHandler) {
        return ErrorHandler(req, res, next, err);
      }
      return res.fail(err);
    }
    callMiddleWare(mws, number + 1, req, res);
  }

  try {
    mws[number](req, res, next);
  } catch (err) {
    if (ErrorHandler) {
      return ErrorHandler(req, res, next, err);
    }
    console.error(err);
    reject(err);
  }
}

function findErrorHanler(mws) {
  for (let i = 0; i < mws.length; i++) {
    if (mws[i].length === 4 && typeof mws[i] === 'function') {
      ErrorHandler = mws[i];
      return;
    }
  }
}

module.exports = Middlewares;
