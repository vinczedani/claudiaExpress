# claudiaExpress
Middleware and more scaleable routing support for claudia API builder

####Currently done:
- minimal middleware support

####Current usage:
- copy the lib/middlewares to your project
- require it like `const middlewares = require('path/to/the/js');`
- with claudia api builder use like this:
```
api.get('/hello', middlewares((req, res, next) => {
  res.data = 'hello claudiaExpress';
  next();
  }, (req, res, next) => {
  res.end(res.data);
  }))
```

###TODOS:
- create router module,
- add the project to npm
- write readme/docs
