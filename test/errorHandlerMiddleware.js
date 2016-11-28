'use strict';

const chai = require('chai');
const expect = chai.expect;

const middlewares = require('../index.js').Middlewares;

describe('Middleware testings', () => {
  describe('Error handler middleware', () => {
    it('Should jump to error handler if next is called with param',
    () => {
      function mw1(req, res, next) {
        const err = 'Sample Error';
        return next(err);
      }

      function mw2(req, res, next) {
        throw new Error('Should not be reached!');
      }

      function errorHandler(req, res, next, err) {
        res.end(err);
      }

      return middlewares(mw1, mw2, errorHandler)()
      .then(returnedValue => {
        expect(returnedValue).to.eql('Sample Error');
      });
    });
  });
});
