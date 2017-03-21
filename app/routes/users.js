const Router = require('koa-router')
const controller = require('./../controllers/users')

const router = new Router({
  prefix: '/users'
})

router.get('/', async function (ctx) {
  ctx.response.status = 200
})

router.post('/create', async function (ctx, next) {
  if (!await controller.create(ctx)) {
    await next()
  }
})

router.post('/auth', async function (ctx, next) {
  if (!await controller.auth(ctx)) {
    await next()
  }
}) // Define routes

router.get('/:id/groups', async function (ctx, next) {
  if (!await controller.groups(ctx)) {
    await next()
  }
})

module.exports = {
  routes: router.routes(),
  methods: router.allowedMethods()
}
