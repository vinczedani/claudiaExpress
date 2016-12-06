'use strict';

module.exports = (ApiResponse, resolve, reject) => {
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

  return res;
}
