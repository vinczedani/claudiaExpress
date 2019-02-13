'use strict';

const chai = require('chai');
const expect = chai.expect;

const Router = require('../index').Router;
const ApiMock = require('./utils/apiMock');
let api;

describe('Header and status tests', function () {
  beforeEach(() => {
    api =  new ApiMock; // get a fresh API-builder mock for each test
  });

  it('should return an object', () => {
    const router = Router(api);
    expect(typeof router).to.eql('object');
  });

  it('should properly return the status and test header', () => {
    const router = Router(api);
    router.get('asd', (req, res, next) => {
      res.status(202);
      expect(res.status()).to.eql(202);
      res.headers.testHeader = 'myHeader';
      res.end('Hello World!');
    });
    return api.call('get', 'asd').then(value => {
      expect(value.body).to.eql('Hello World!');
      expect(value.status).to.eql(202);
      expect(value.headers.testHeader).to.eql('myHeader');
    });
  });

  it('should ignore the set status if error happened', () => {
    const router = Router(api);
    router.get('asd', (req, res, next) => {
      res.status(202);
      expect(res.status()).to.eql(202);
      res.fail('error happened');
    });
    return api.call('get', 'asd').then(value => {
      expect(value.body).to.eql('error happened');
      expect(value.status).to.eql(500);
    });
  });

  it('should be able to set custom error status', () => {
    const router = Router(api);
    router.get('asd', (req, res, next) => {
      res.status(202);
      expect(res.status()).to.eql(202);
      res.fail('Not Found!', 404);
    });
    return api.call('get', 'asd').then(value => {
      expect(value.body).to.eql('Not Found!');
      expect(value.status).to.eql(404);
    });
  });

  it('should be return json data', () => {
    const router = Router(api);
    router.get('json-sample', (req, res, next) => {
      res.json({
        message: 'this is json format'
      });
    });
    return api.call('get', 'json-sample').then(value => {
      expect(value.status).to.eql(200);
      expect(value.body.message).to.eql('this is json format');
    });
  });
});
