const models = require('./../models')

const logEx = new RegExp('^[a-zA-Z]{3,12}$')
const emailEx = new RegExp('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$')

const auth = (email, password) =>
models.users.filter({
  email: email,
  password: password,
}).run()

module.exports.auth = async function (ctx) {
  const user = await auth(ctx.request.body.email, ctx.request.body.password)
  if (user[0]) {
    ctx.status = 200
  } else {
    ctx.throw(401, 'Wrong Login or Password')
  }
}

module.exports.create = async function (ctx) {
  if (!emailEx.test(ctx.request.body.email) || !logEx.test(ctx.request.body.login) || ctx.request.body.password.length < 8) {
    ctx.throw(401, `Infos sent didn't match requirements`)
  } else {
    await models.users.save({
      login: ctx.request.body.login,
      password: ctx.request.body.password,
      email: ctx.request.body.email,
    })
    ctx.status = 200
  }
}
