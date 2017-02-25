// launching the server
process.env.NODE_ENV = 'test';
var server = require('../server.js');

// packages used to run tests
var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');
var request = request('http://localhost:8085');

describe('Tests backend API', function(){
  describe('Testing server responses', function(){
    it('Should return 200 when GET on /test', function(done){
      request
        .get('/test')
        .expect(200)
        .end(done);
    });
  });
});
