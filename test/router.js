'use strict';

const chai = require('chai');
const expect = chai.expect;

const Router = require('../index').Router;
const api = require('./utils/apiMock');

describe('Router testing', function () {
  describe('RouterBase testing', function () {
    it('should return an object', () => {
      const router = Router(api);
      expect(typeof router).to.eql('object');
    });

    it('should register the endpoint handler in the api-builder!', () => {
      const router = Router(api);
      router.get('asd', (req, res, next) => {
        res.end('Hello RouterBase!');
      });
      return api.call('get', 'asd').then(value => {
        expect(value).to.eql('Hello RouterBase!');
      });
    });
  });
});
