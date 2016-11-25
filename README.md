# claudiaExpress
Express like middleware support for claudia API builder

####Currently done:
- middleware support
- 4 param error handler middlewares

####Current usage:
- copy the lib/middlewares to your project
- with claudia api builder use like this:

```
const middlewares = require('path/to/the/js');

api.get('/hello', middlewares((req, res, next) => {
  res.data = 'hello claudiaExpress';
  next();
  }, (req, res, next) => {
  res.end(res.data);
  }))
```

###TODOS:
- create router module
- add the project to npm
- replace current 'manual' test, and write mocha tests
