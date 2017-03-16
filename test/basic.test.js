import test from 'ava'
import request from 'supertest'

import { credentials, setupUsers, deleteUsers } from './helpers/db'
import { defaultApp, paths, types } from './helpers/server'

const testSignIn = async (t, login, password, status) => {
  const res = await request(defaultApp)
        .post(paths.users.signIn)
        .type(types.json)
        .send({
          login,
          password,
        })

  t.is(res.status, status)
}

/**
 * Ava settup
 */

test.before('db setup', setupUsers)

test.after.always('db cleanup', deleteUsers)

/**
 * Real testing is done from here
 */

test('Basic connection', async t => {
  const res = await request(defaultApp).get(paths.test).send()

  t.is(res.status, 200)
})

test('auth:wrong:login',
  testSignIn,
  credentials.wrong.login,
  credentials.correct.password,
  401)

test('auth:invalid:password',
  testSignIn,
  credentials.correct.login,
  credentials.wrong.password,
  401)

test('auth:correct',
  testSignIn,
  credentials.correct.login,
  credentials.correct.password,
  200)
