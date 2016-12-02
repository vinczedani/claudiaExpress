# claudiaExpress
Express like middleware support for claudia API builder. The module is designed for developers who come from the express framework but want to try out AWS Lambda. ClaudiaJS with Claudia API builder is an easy way to start.

####Features:
- middleware support
- 4 param error handler middlewares
- tree like routing

####Install:
```
npm install claudiaexpress
```
###Usage:

```
index.js

const ApiBuilder = require('claudia-api-builder');
const api = new ApiBuilder();
const Router = require('claudiaexpress').Router;
const router = Router(api);

const routes = require('./routes.js');

router.use('v1/', routes);

module.exports = router.bootstrap();

routes.js
const Router = require('claudiaexpress').Router;
const router = Router();
const endpoints = require('path to your endpoints');

router.get('/hello', (req, res, next) => {
    res.end('Hello World');
  });
router.use('more/', endpoints); // these should be accessed through url/v1/more/...
```
###Middleware parameters:
req
- the request object provided by claudia API builder

res
- res.end(data) will send data, default status code is 200
- res.fail(err, status) will send error response, default status code is 500
- res.status(status) will set the status of the message you send at res.end();
- res.headers is an object, to add a header use `res.headers.MyHeader = 'ASD';`
- res.sendStatus(status) will send a response without response body with given status (or 200, if status is not given)

next()
- will call the next middleware when called without parameter, will call error handler when called with parameter.

[err]
- error object used in the error handler middlewares.

###Testing:
`npm test`
Runs all the mocha tests in the `./test` folder.

###TODOS:
- upgrade response object to be more express like
- add istanbul and more tests for 100% coverage
- upgrade router so it can be used either with the middlewares feature, or the classic claudiaJS handler

Developer:

Daniel Vincze@
Coding Sans Zrt.

http://codingsans.com/
