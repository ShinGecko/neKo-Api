import server from '../../app/server'

export function appInstance() {
  return server({ env: 'test' }).listen()
}

export const defaultApp = server({ env: 'test' }).listen()

export const paths = {
  test: '/test',
  users: {
    signUp: '/users',
    signIn: '/users/auth',
  }
}

export const types = {
  json: 'json'
}
