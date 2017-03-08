const Router = require('koa-router')

const router = new Router({
  prefix: '/test'
})

router.get('/', async function (ctx) {
  ctx.response.status = 200
})

module.exports = {
  routes: router.routes(),
  methods: router.allowedMethods()
}
