'user strict';

const middlewares = require('../index.js').Middlewares;
middlewares((req, res, next) => {
  res.data = 'Hello ClaudiaExpress';
  next();
}, (req, res, next) => {
  if (res.data !== 'Hello ClaudiaExpress') {
    return next('oh no!');
  }
  res.end(res.data);
}, (req, res, next, err) => {
  console.log('Error handler Middleware');
  console.log(err);
  res.end('custom error handling can be done here');
})().then(a => {
  console.log(a);
}).catch(err => {
  console.log(err);
});

middlewares((req, res) => {
  res.end('how it handles when it is used twice?');
})().then(a => {
  console.log(a);
});
