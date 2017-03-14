process.env.NODE_ENV = 'tests'
/* global describe, it */
const chai = require('chai')// eslint-disable-line no-unused-vars
const supertest = require('supertest')
const server = require('../app/server')
const config = require('../app/utils/config')

// launching the server

server.start(1337)

const request = supertest(`http://localhost:${config.get('general.port')}`)

// packages used to run tests
// const expect = chai.expect

// const needed to run tests
// Login infos
const correctLogin = 'test'
const correctEmail = 'test@test.test'
const correctPassword = 'test123'
const wrongLogin = 't'
const wrongEmail = 'test'
const wrongPassword = 'test1'
// Paths
const testPath = '/test'
const signUpPath = '/users'
const signInPath = '/users/auth'
// Types
const typeJson = 'json'
// const typeText = 'text/plain'

describe('Tests backend API', function () {
  describe('Testing server responses', function () {
    it('Should return 200 when GET on /test', function (done) {
      request
      .get(testPath)
      .expect(200)
      .end(done)
    })
  })
  describe('Test Sign-Up', function () {
    it('returns 201 and ID when correct Login, Email and Password are sent', function (done) {
      request
      .post(signUpPath)
      .type(typeJson)
      .send({
        login: correctLogin,
        email: correctEmail,
        password: correctPassword
      })
      .expect(201)
      .end(done)
    })
  })
  it('returns 401 when wrong Login is sent', function (done) {
    request
    .post(signUpPath)
    .type(typeJson)
    .send({
      login: wrongLogin,
      email: correctEmail,
      password: correctPassword
    })
    .expect(401)
    .end(done)
  })
  it('returns 401 when wrong Email is sent', function (done) {
    request
    .post(signUpPath)
    .type(typeJson)
    .send({
      login: correctLogin,
      email: wrongEmail,
      password: correctPassword
    })
    .expect(401)
    .end(done)
  })
  it('returns 401 when wrong Password is sent', function (done) {
    request
    .post(signUpPath)
    .type(typeJson)
    .send({
      login: correctLogin,
      email: correctEmail,
      password: wrongPassword
    })
    .expect(401)
    .end(done)
  })
})
describe('Test Sign-In', function () {
  it('returns 200 when correct Login and Password are sent', function (done) {
    request
    .post(signInPath)
    .type(typeJson)
    .send({
      login: correctLogin,
      password: correctPassword
    })
    .expect(200)
    .end(done)
  })
  it('returns 401 when wrong Login is sent', function (done) {
    request
    .post(signInPath)
    .type(typeJson)
    .send({
      login: wrongLogin,
      password: correctPassword
    })
    .expect(401)
    .end(done)
  })
  it('returns 401 when wrong Password is sent', function (done) {
    request
    .post(signInPath)
    .type(typeJson)
    .send({
      login: correctLogin,
      password: wrongPassword
    })
    .expect(401)
    .end(done)
  })
})
