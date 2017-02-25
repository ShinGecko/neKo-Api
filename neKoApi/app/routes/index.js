var _ = require('lodash');

var routes = [];

var files = [
  'test' //, 'chat', 'user'
];

for (var i=0 ; i < files.length ; i++){
  var file = require('./'+files[i]);
  if(_.isArray(file)) routes = routes.concat(file);
  else routes.push(file);
}

module.exports = routes;
