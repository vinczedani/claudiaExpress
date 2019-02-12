'use strict';

const chai = require('chai');
const expect = chai.expect;

const Router = require('../index').Router;
const ApiMock = require('./utils/apiMock');
let api;

describe('Router testing', function () {
  describe('RouterBranch testing', function () {
    beforeEach(() => {
      api =  new ApiMock; // get a fresh API-builder mock for each test
    });

    it('should return an object', () => {
      const router = Router();
      expect(typeof router).to.eql('object');
    });

    it('should throw error if bad middleware is provided', () => {
      const router = Router();
      let errorThrown = false;
      try {
        router.get('asd', 'not a middleware');
      } catch (e) {
        errorThrown = true;
        expect(e.message).to.eql('Wrong middleware function provided!');
      }
      if (!errorThrown) {
        throw new Error('Expected error to be thrown!');
      }
    });

    it('should support different http methods', () => {
      const router = Router();
      router.get('asd', (req, res, next) => {
        res.end('Hello Get!');
      });
      router.post('asd', (req, res, next) => {
        res.end('Hello Post!');
      });
      router.put('asd', (req, res, next) => {
        res.end('Hello Put!');
      });
      router.options('asd', (req, res, next) => {
        res.end('Hello Options!');
      });
      router.delete('asd', (req, res, next) => {
        res.end('Hello Delete!');
      });

      const routerBase = Router(api);
      routerBase.use('v1/', router);

      return api.call('get', 'v1/asd').then(value => {
        expect(value.body).to.eql('Hello Get!');
        return api.call('post', 'v1/asd');
      }).then(value => {
        expect(value.body).to.eql('Hello Post!');
        return api.call('put', 'v1/asd');
      }).then(value => {
        expect(value.body).to.eql('Hello Put!');
        return api.call('options', 'v1/asd');
      }).then(value => {
        expect(value.body).to.eql('Hello Options!');
        return api.call('delete', 'v1/asd');
      }).then(value => {
        expect(value.body).to.eql('Hello Delete!');
      });
    });

    it('should register the endpoint handler in the api-builder!', () => {
      const router = Router();
      router.get('asd', (req, res, next) => {
        res.end('Hello RouterBranch!');
      });
      const routerBase = Router(api);
      routerBase.use('v1/', router);
      return api.call('get', 'v1/asd').then(value => {
        expect(value.body).to.eql('Hello RouterBranch!');
      });
    });

    it('should support middleware before in method use', () => {
      const router = Router();
      router.get('asd', (req, res, next) => {
        res.end('Hello RouterBranch!');
      });
      router.get('asd2', (req, res, next) => {
        res.end('Hello RouterBranch2!');
      });

      const mw = (req, res, next) => {
        res.end('This is middleware for interrupt handler')
      };

      const routerBase = Router(api);
      routerBase.use('v1/', mw, router);

      return api.call('get', 'v1/asd').then(value => {
        expect(value.body).to.eql('This is middleware for interrupt handler');
        return api.call('get', 'v1/asd2');
      }).then(value => {
        expect(value.body).to.eql('This is middleware for interrupt handler');
      });
    });

    it('should support middleware after in method use', () => {
      const router = Router();
      router.get('asd', (req, res, next) => {
        next();
      });
      router.get('asd2', (req, res, next) => {
        next();
      });

      const mwBefore = (req, res, next) => {
        next();
      };

      const mwAfter = (req, res, next) => {
        res.end('This is middleware after handler')
      };

      const routerBase = Router(api);
      routerBase.use('v1/', mwBefore, router, mwAfter);

      return api.call('get', 'v1/asd').then(value => {
        expect(value.body).to.eql('This is middleware after handler');
        return api.call('get', 'v1/asd2');
      }).then(value => {
        expect(value.body).to.eql('This is middleware after handler');
      });
    });
  });
});
