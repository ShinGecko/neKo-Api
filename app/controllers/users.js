const model = require('./../models/user')
const requests = require('./../models/requests')

const logEx = /^[\w-]{3,24}$/
const emailEx = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]{2,})+$/

module.exports.auth = async function (ctx) {
  let type
  if (ctx.request.body.login.search('@') === -1) {
    type = 'login'
  } else {
    type = 'email'
  }
  const user = await requests.reqDoubleArg(model, type, ctx.request.body.login, 'password', ctx.request.body.password)
  if (user[0]) {
    ctx.status = 200
    return user[0]
  }
  ctx.throw(401, 'Wrong Login or Password')
}

module.exports.create = async function (ctx) {
  if (!emailEx.test(ctx.request.body.email) || !logEx.test(ctx.request.body.login) || ctx.request.body.password.length < 7) {
    ctx.throw(401, `Infos sent didn't match requirements`)
  } else {
    await model.save({
      login: ctx.request.body.login,
      password: ctx.request.body.password,
      email: ctx.request.body.email,
    })
    ctx.status = 200
  }
}

/* eslint-disable no-unused-vars */
module.exports.getGroups = async function (ctx) {
  console.log(ctx.state.user)
  // requests.reqFreeArg()
}
