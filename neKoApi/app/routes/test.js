const router = require('koa-router')({
  prefix:'/test'
});

router.get('/', async function (ctx, next) {
  ctx.response.status = 200
  await next;
});

module.exports = router;
