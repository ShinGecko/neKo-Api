const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const routes = require('./routes')
const { utils, logger } = require('./middlewares')
const config = require('./utils/config')

const app = new Koa()

app.use(logger())
app.use(utils.responseTime())
app.use(utils.catchErrors({ toJson: true }))
app.use(cors({
  origin: function (ctx) {
    if (ctx.url === '/test') {
      return true
    }
    return '*'
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

app.use(bodyParser())

for (const route of routes.routes) {
  app.use(route)
}

for (const method of routes.methods) {
  app.use(method)
}

app.use(utils.endOfStack())

module.exports = {
  app,
  start(port = config.get('general.port')) {
    config.set('general.port', port)
    console.log(config.get('.'))
    return app.listen(port, () => console.log(`Server listening on port ${config.get('general.port')}`))
  }
}