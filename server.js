const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const routes = require('./app/routes')
const { utils, logger } = require('./app/middlewares')

const app = new Koa()

app.use(logger())
app.use(utils.allowCrossDomain())
app.use(utils.responseTime())
app.use(utils.catchErrors({ toJson: true }))

app.use(bodyParser())

for (const route of routes.routes) {
  app.use(route)
}

for (const method of routes.methods) {
  app.use(method)
}

// app.use(utils.endOfStack())

module.exports = app.listen(process.env.PORT || 8085, function () {
  console.log('Server listening on port 8085')
})
