const Koa = require('koa')
const routes = require('./app/routes')

const app = new Koa()

app.use(allowCrossDomain)

for (const route of routes.routes) {
  app.use(route)
}

for (const method of routes.methods) {
  app.use(method)
}

async function allowCrossDomain(ctx, next) {
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set('Content-Type', 'text/html; charset=utf-8')
  ctx.set('Access-Control-Allow-Credentials', true)
  ctx.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  ctx.set('Access-Control-Allow-Headers', 'Content-Type,Authorization,Origin')
  await next
}

app.listen(process.env.PORT || 8085, function () {
  console.log('Server listening on port 8085')
})
