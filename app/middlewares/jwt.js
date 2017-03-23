const jwt = require('jsonwebtoken')

const secret = '1371783'

async function createToken(id) {
  return {
    token: jwt.sign({
      profile: {
        id: id
      }
    },
    secret,
    { expiresIn: 300 })
  }
}

function checkToken() {
  return function (ctx, next) {
    let token = {}
    if (ctx.path !== '/users/auth') {
      token = jwt.verify(ctx.header.authorization, secret)
    }
    ctx.state.user = token.profile
    console.log(token)
    return next()
  }
}

module.exports = {
  createToken,
  checkToken
}
