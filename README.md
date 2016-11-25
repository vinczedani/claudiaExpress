# claudiaExpress
Express like middleware support for claudia API builder. The module is designed for developers who come from the express framework but want to try out AWS Lambda. ClaudiaJS with Claudia API builder is an easy way to start.

####Features:
- middleware support
- 4 param error handler middlewares

####Install:
```
npm install claudiaexpress
```
###Usage:
```
const middlewares = require('claudiaexpress').Middlewares;

api.get('/hello', middlewares((req, res, next) => {
  res.data = 'hello claudiaExpress';
  next();
  }, (req, res, next) => {
  res.end(res.data);
  }))
```
###Middleware parameters:
- req - the request object provided by claudia API builder
- res - object containing end(data) and fail(err) functions
- - end will send an ok (200) response with the data object
- - fail will send a bad request (400) response with the err !stringified!
- - error codes can be configured at the API gateway, with using regexps like .*\[404\].*
```
...
return res.fail('[404] Resource not found');
...
```
- - this will send an error response with status 404

###TODOS:
- create router module
- add the project to npm
- replace current 'manual' test, and write mocha tests
- upgrade response object to be more express like
