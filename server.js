const Koa = require('koa')
const routes = require('./app/routes')
const { utils, logger } = require('./app/middlewares')
const bodyParser = require('koa-bodyparser')

const app = new Koa()

//app.use(logger())
//app.use(utils.responseTime())
//app.use(utils.catchErrors({ toJson: true }))

app.use(bodyParser())

for (const route of routes.routes) {
  app.use(route)
}

for (const method of routes.methods) {
  app.use(method)
}

//app.use(utils.endOfStack())

module.exports = app.listen(process.env.PORT || 8085, function () {
  console.log('Server listening on port 8085')
})

// TODO: move in it's own file, or in app/middlewares/utils.js
// async function allowCrossDomain(ctx, next) {
//   ctx.set('Access-Control-Allow-Origin', '*')
//   ctx.set('Content-Type', 'text/html; charset=utf-8')
//   ctx.set('Access-Control-Allow-Credentials', true)
//   ctx.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
//   ctx.set('Access-Control-Allow-Headers', 'Content-Type,Authorization,Origin')
//   await next()
// }
