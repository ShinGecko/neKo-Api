const Router = require('koa-router')
const jwt = require('jsonwebtoken')
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
  const user = await controller.auth(ctx)
  ctx.body = {
    token: jwt.sign({
      profile: {
        id: user.id
      }
    },
    'secret',
    { expiresIn: 300 })
  }
})

router.get('/groups', async function (ctx) {
  await controller.groups(ctx)
})

module.exports = {
  routes: router.routes(),
  methods: router.allowedMethods()
}
