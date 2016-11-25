'user strict';

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
      console.log(args);

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
  function next(err) {
    if (err) {
      // !TODO proper errorhandling!
      return res.fail(err);
    }
    callMiddleWare(mws, number + 1, req, res);
  }

  mws[number](req, res, next);
}

module.exports = Middlewares;
