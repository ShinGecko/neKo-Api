const models = require('./../models')

const Users = models.Users

module.exports.auth = async function (ctx) {
  Users.findOne({ login: this.login, password: this.password }, function (err, model) {
    if (err) {
      throw err
    }
    if (model) {
      ctx.body = model._id
      // Auth.userService.isConnected = true
    } else {
      ctx.set('Content-Type', 'text/plain')
      ctx.status = 401
      ctx.body = 'Wrong Login or Password'
    }
  })
}
