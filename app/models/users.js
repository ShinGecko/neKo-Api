const thinky = require('./../utils/thinky')
const requests = require('./requests')

const type = thinky.type
const r = thinky.r

/* eslint-disable camelcase */
const Users = thinky.createModel('User', {
  id: type.string().default(r.uuid()),
  login: type.string(),
  password: type.string(),
  email: type.string().email(),
  birthDate: type.date(),
  age: type.number(),
})

Users.pre('save', async function (next) {
  let res = await requests.reqSingleArg(Users, 'email', this.email)
  if (res[0]) {
    next(new Error('Email already taken'))
  }
  res = await requests.reqSingleArg(Users, 'login', this.login)
  if (res[0]) {
    next(new Error('Login already taken'))
  }
  next()
})

Users.post('save', function (next) {
  if (this.birthDate) {
    this.age = this.birthDate.prototype.getFullYear() - r.now().prototype.getFullYear()
  }
  next()
})

// Users.define('authenticateUser', function (email, password) {
//  if (password === this.password && email === this.email) {
//    return true
//  }
// return false
// })
/* eslint-enable camelcase */

module.exports = Users
