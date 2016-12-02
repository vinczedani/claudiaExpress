'use strict';

const chai = require('chai');
const expect = chai.expect;

const middlewares = require('../index.js').Middlewares;

describe('Middleware testing', () => {
  describe('Core functionality', () => {
    it('should go through the middlewares and the data attached to the param objects should work in middlewares',
    () => {
      function mw1(req, res, next) {
        res.data = 'Hello ClaudiaExpress!';
        return next();
      }

      function mw2(req, res, next) {
        return next();
      }

      function mw3(req, res, next) {
        res.end(res.data);
      }

      return middlewares(mw1, mw2, mw3)()
      .then(returnedValue => {
        expect(returnedValue).to.eql('Hello ClaudiaExpress!');
      });
    });

    it('should throw error if next is called in the last middleware',
    () => {
      function mw1(req, res, next) {
        res.data = 'Hello ClaudiaExpress!';
        return next();
      }

      function mw2(req, res, next) {
        return next();
      }

      return middlewares(mw1, mw2)()
      .catch(err => {
        expect(err.message).to.eql('You called next() when there is no more middleware left!');
      });
    });

    it('should throw error if a middleware is not a function',
    () => {
      function mw1(req, res, next) {
        res.data = 'Hello ClaudiaExpress!';
        return next();
      }

      function mw2(req, res, next) {
        return next();
      }

      const mw3 = 'Not a function';

      return middlewares(mw1, mw2, mw3)()
      .catch(err => {
        expect(err.message).to.eql('The provided middleware is not a function!');
      });
    });

    it('should give unhandled exception to errorhandler',
    () => {
      function mw1(req, res, next) {
        throw new Error('Unhandled error');
      }

      function mw2(req, res, next) {
        // this should not be reached
        expect(true).to.eql(false);
      }

      function mw3(req, res, next, err) {
        return res.end('Unhandled exception is now handled!');
      }

      return middlewares(mw1, mw2, mw3)()
      .then(value => {
        expect(value).to.eql('Unhandled exception is now handled!');
      });
    });
  });
});
