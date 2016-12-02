'use strict';

let ErrorHandler;

function Middlewares() {
  const args = arguments;
  const ApiResponse = this && this.ApiResponse;
  return (req) => {
    return new Promise((resolve, reject) => {
      const res = {
        headers: {},
      };
      res.end = (data) => {
        resolve(ApiResponse ? new ApiResponse(data, res.headers, res._status || 200) : data);
      }
      res.fail = (err, status) => {
        if (ApiResponse) {
          return resolve(new ApiResponse(err, res.headers, status || 500));
        }
        reject(JSON.stringify(err));
      }
      res.status = (code) => {
        if (!code) {
          return res._status;
        }
        res._status = code;
      }
      res.sendStatus = (status) => {
        if (!ApiResponse) {
          return console.error('This feature is only works when you use the whole router module!');
        }
        resolve(new ApiResponse({}, res.headers, status || 200));
      }

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

  mws[number](req, res, next);
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
