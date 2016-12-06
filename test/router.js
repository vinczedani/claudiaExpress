'use strict';

const chai = require('chai');
const expect = chai.expect;

const Router = require('../index').Router;
const ApiMock = require('./utils/apiMock');
let api;

describe('Router testing', function () {
  describe('RouterBase testing', function () {
    beforeEach(() => {
      api =  new ApiMock; // get a fresh API-builder mock for each test
    });

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
        expect(value.body).to.eql('Hello RouterBase!');
      });
    });
  });
});
