var models = {};

var files = [
  'users'
];

for(let i in files) {
  models[files[i]] = require('./' + files[i]);
}
console.log(models);
module.exports = models;
