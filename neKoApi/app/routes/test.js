var router = require('koa-router')();

router.get('/test', function*(next){
  this.response.status = 200
  yield next;
});

module.exports = router;
