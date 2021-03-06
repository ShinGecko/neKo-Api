const jwt = require('jsonwebtoken')

const secret = '1371783'
const expirationTime = 1000000000 // time in seconds

async function createToken(user) {
  return {
    token: jwt.sign({
      profile: {
        email: user.email,
        login: user.login,
        id: user.id
      }
    },
    secret,
    { expiresIn: expirationTime })
  }
}

function checkToken() {
  return function (ctx, next) {
    let token = {}
    if (ctx.path !== '/users/auth' && ctx.path !== '/users/create') {
      token = jwt.verify(ctx.header.authorization, secret)
    }
    ctx.state.user = token.profile
    return next()
  }
}

module.exports = {
  createToken,
  checkToken
}
