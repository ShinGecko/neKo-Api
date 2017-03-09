const Router = require('koa-router')
const controllers = require('./../controllers')

const router = new Router({
  prefix: '/users'
})

router.get('/', async function (ctx) {
  ctx.response.status = 200
})

router.post('/create', async function (ctx, next) {
  console.log('precontroller')
  if (!await controllers.users.create(ctx)) {
    await next()
  }
  console.log('postcontroller')
})

router.post('/auth', async function (ctx, next) {
  if (!await controllers.users.auth(ctx)) {
    await next()
  }
}) // Define routes

module.exports = {
  routes: router.routes(),
  methods: router.allowedMethods()
}
