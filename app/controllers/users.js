const models = require('./../models')

const logEx = new RegExp('^[a-zA-Z]{3,12}$')
const emailEx = new RegExp('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$')
const passEx = new RegExp('^(?=.*[0-9])(?=.*[a-zA-Z]).{7,20}$')

module.exports.auth = async function (ctx) {
  if (models.users.authenticateUser(this.email, this.password)) {
    ctx.status = 200
  } else {
    ctx.set('Content-Type', 'text/plain')
    ctx.status = 401
    ctx.body = 'Wrong Login or Password'
  }
  return true
}

module.exports.create = async function (ctx) {
  if (!emailEx.test(ctx.request.body.email) || !logEx.test(ctx.request.body.login) || !passEx.test(ctx.request.body.password)) {
    ctx.set('Content-Type', 'text/plain')
    ctx.status = 401
    ctx.body = 'Infos sent didn\'t match requirements'
  } else {
    await models.users.save({
      login: ctx.request.body.login,
      password: ctx.request.body.password,
      email: ctx.request.body.email,
    })
    ctx.status = 200
  }
  return true
}
