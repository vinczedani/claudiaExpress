'user strict';

const middlewares = require('../index.js').Middlewares;
middlewares((req, res, next) => {
  console.log(1);
  res.data = 'stuff';
  next();
}, (req, res, next) => {
  console.log(2);
  console.log(res);
  res.end('coolio');
})().then(a => {
  console.log(a);
}).catch(err => {
  console.log(err);
});
