const jwt = require('jsonwebtoken')

const secret = '1371783'
const expirationTime = 3600 // time in seconds

async function createToken(id) {
  return {
    token: jwt.sign({
      profile: {
        id: id
      }
    },
    secret,
    { expiresIn: expirationTime })
  }
}

function checkToken() {
  return function (ctx, next) {
    let token = {}
    if (ctx.path !== '/users/auth') {
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
