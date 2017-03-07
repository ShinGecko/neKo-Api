const models = require('./../models')

// TODO: proper name
const Users = models[0]

module.exports.auth = async function (ctx) {
  if (Users.authenticateUser(this.email, this.password)) {
    ctx.response.status = 200
  }
  else {
    ctx.set('Content-Type', 'text/plain')
    ctx.response.status = 401
    ctx.body = 'Wrong Login or Password'
  }
}

module.exports.create = async function (ctx) {
  let logEx = new RegExp('^[a-zA-Z]{3,12}$')
  let emailEx = new RegExp('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$')
  let passEx = new RegExp('^(?=.*[0-9])(?=.*[a-zA-Z]).{7,20}$')
  if (!emailEx.test(ctx.request.body.email) || !logEx.test(ctx.request.body.login) || !passEx.test(ctx.request.body.password)) {
    ctx.set('Content-Type', 'text/plain')
    ctx.response.status = 401
    ctx.body = 'Infos sent didn\'t match requirements'
  }
  else {
    Users.save({
      login: ctx.request.body.login,
      password: ctx.request.body.password,
      email: ctx.request.body.email,
    }).then(function (result) {
      ctx.response.status = 201
    }).error(function (error) {

    })
  }
}
