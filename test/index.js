import test from 'ava'
import request from 'supertest'

import server from '../app/server'

const appInstance = () => server({ env: 'test' }).listen()

const defaultApp = appInstance()

const correct = {
  login: 'test',
  email: 'test@example.com',
  password: 'test1234',
}

const wrong = {
  login: 'nopenope',
  email: 'nope@email.hey',
  password: 'thefuck_man',
}

const invalid = { // eslint-disable-line no-unused-vars
  login: '',
  email: 'foo.bar',
  password: '5chars',
}

const paths = {
  test: '/test',
  signUp: '/users',
  signIn: '/users/auth',
}
const jsonType = 'json'

const testSignIn = async (t, login, password, status) => {
  const res = await request(defaultApp)
        .post(paths.signIn)
        .type(jsonType)
        .send({
          login,
          password,
        })

  t.is(res.status, status)
}

test('Basic connection', async t => {
  const res = await request(defaultApp).get(paths.test).send()

  t.is(res.status, 200)
})

test('auth:wrong:login',
  testSignIn,
  wrong.login,
  correct.password,
  401)

test('auth:invalid:password',
  testSignIn,
  correct.login,
  wrong.password,
  401)

test('auth:correct',
  testSignIn,
  correct.login,
  correct.password,
  200)
