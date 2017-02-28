const Router = require('koa-router')

const router = new Router({
  prefix: '/users'
})

router.get('/', async function (ctx) {
  ctx.response.status = 200
}) // Define routes

module.exports = {
  routes: router.routes(),
  methods: router.allowedMethods()
}
