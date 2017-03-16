const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const routes = require('./routes')
const { utils, logger } = require('./middlewares')
const config = require('./utils/config')

const envs = {
  test: 'test',
  dev: 'development',
  prod: 'production',
}

/**
 * Create an instance of the server, abd returns it
 * @param {Object} opts - holds the options for the server
 * @param {String} opts.env - current environnement (dev, prod, test)
 */
function createServer(opts) {
  const { env } = Object.assign({ env: 'development' }, opts)
  const app = new Koa()

  if (env !== envs.test) {
    app.use(logger()) // no logs on tests
  }
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

  app.start = (port = config.get('general.port')) => {
    config.set('general.port', port)
    return app.listen(port, () => console.log(`Server listening on port ${config.get('general.port')}`))
  }
  return app
}

module.exports = createServer
