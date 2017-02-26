var router = require('koa-router');

router.get('/', function* (){this.response.status = 200}); // Define routes

module.exports = router;
