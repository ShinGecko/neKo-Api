var router = require('koa-router')({
  prefix:'/users'
});

router.get('/', function* (){this.response.status = 200}); // Define routes

module.exports = router;
