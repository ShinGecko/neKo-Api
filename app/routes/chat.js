const Router = require('koa-router')
const controller = require('./../controllers/chat')

const router = new Router({
  prefix: '/chat'
})

router.get('/:id', async function (ctx) {
  controller.function(ctx.params.id)
})
