var koa = require('koa');
var app = koa();
var _ = require('lodash');

var routes = require('./app/routes');

app.use(allowCrossDomain);
_.forEach(routes, function(route){
  app.use(route.routes());
});

function *allowCrossDomain (next){
    this.set('Access-Control-Allow-Origin', '*');
    this.set('Content-Type', 'text/html; charset=utf-8');
    this.set('Access-Control-Allow-Credentials', true);
    this.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    this.set('Access-Control-Allow-Headers', 'Content-Type,Authorization,Origin');
    yield next;
}

app.listen(8085, function(){
  console.log("Server listening on port 8085");
});
