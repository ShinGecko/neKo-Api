/* eslint-disable no-unused-vars */
const Router = require('koa-router')
const controller = require('./../controllers/chats')

const router = new Router({
  prefix: '/chats'
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
