const Router = require('koa-router')
const controller = require('./../controllers/users')

const router = new Router({
  prefix: '/users'
})

router.get('/', async function (ctx) {
  ctx.response.status = 200
})

router.post('/create', async function (ctx) {
  await controller.create(ctx)
})
router.post('/auth', async function (ctx) {
  await controller.auth(ctx)
})

router.get('/groups', async function (ctx) {
  await controller.getGroups(ctx)
})

module.exports = {
  routes: router.routes(),
  methods: router.allowedMethods()
}
