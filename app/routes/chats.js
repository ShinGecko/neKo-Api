/* eslint-disable no-unused-vars */
const Router = require('koa-router')
const controller = require('./../controllers/chat')

const router = new Router({
  prefix: '/chat'
})

router.get('/:id/messages', async function (ctx) {
  // TODO: stuff
})

router.get('/:id/leader', async function (ctx) {
  // TODO: stuff
})

module.exports = {
  routes: router.routes(),
  methods: router.allowedMethods()
}
