'user strict';

let ErrorHandler;

function Middlewares() {
  const args = arguments;
  return (req) => {
    return new Promise((resolve, reject) => {
      const res = {};
      res.end = (data) => {
        resolve(data);
      }
      res.fail = (err) => {
        reject(JSON.stringify(err));
      }

      callMiddleWare(args, 0, req, res);
    });
  }
}

function callMiddleWare(mws, number, req, res) {
  if (!mws[number]) {
    return console.error('You called next() when there is no more middleware left!');
  }
  if (typeof mws[number] !== 'function') {
    return console.error('The provided middleware is not a function!');
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
