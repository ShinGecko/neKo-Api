var router = require('koa-router')({
  prefix:'/test'
});

router.get('/', function*(next){
  this.response.status = 200
  yield next;
});

module.exports = router;
