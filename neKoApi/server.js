var koa = require('koa');
var router = require('koa-router');
var app = koa();

var _ = router(); //Instantiate the router

_.get('/test', function* (){this.status = 200}); // Define routes
app.use(_.routes()); //Use the routes defined using the router
app.use(allowCrossDomain);


function *allowCrossDomain (next){
    this.header('Access-Control-Allow-Origin', '*');
    this.header('Content-Type', 'text/html; charset=utf-8');
    this.header('Access-Control-Allow-Credentials', true);
    this.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    this.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,Origin');
}

app.listen(8085, function(){
  console.log("Server listening on port 8085");
});
