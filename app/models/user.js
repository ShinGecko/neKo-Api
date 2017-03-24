const thinky = require('./../utils/thinky')

const type = thinky.type
const r = thinky.r

const Users = thinky.createModel('User', {
  id: type.string().default(r.uuid()),
  login: type.string(),
  password: type.string(),
  email: type.string().email(),
  birthDate: type.date(),
  age: type.number(),
})

Users.pre('save', async function (next) {
  const email = await Users.filter(r.row('email').eq(this.email)).run()
  const login = await Users.filter(r.row('login').eq(this.login)).run()
  if (email[0]) {
    next(new Error('Email already taken'))
  } else if (login[0]) {
    next(new Error('Login already taken'))
  } else {
    next()
  }
})

Users.post('save', function (next) {
  if (this.birthDate) {
    this.age = this.birthDate.prototype.getFullYear() - r.now().prototype.getFullYear()
  }
  next()
})

module.exports = Users
