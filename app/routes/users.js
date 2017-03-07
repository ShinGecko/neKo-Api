const Router = require('koa-router')
const Controllers = require('./../controllers')

const router = new Router({
  prefix: '/users'
})

router.get('/', async function (ctx, next) {
  ctx.response.status = 200
  await next()
})

router.post('/create', async function (ctx, next) {
  // TODO : give proper name like Controllers.users.create
  Controllers[0].create(ctx)
  await next()
})

router.post('/auth', async function (ctx, next) {
  // TODO : give proper name like Controllers.users.auth
  Controllers[0].auth(ctx)
  await next
}) // Define routes

module.exports = {
  routes: router.routes(),
  methods: router.allowedMethods()
}
