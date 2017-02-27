const router = require('koa-router')({
  prefix:'/users'
});

router.get('/', async function (ctx) {
  ctx.response.status = 200;
}); // Define routes

module.exports = router;
