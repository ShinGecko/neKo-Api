const models = {}

const files = [
  'users'
]

for (const i of files) {
  models[files[i]] = require('./' + files[i]) // eslint-disable-line import/no-dynamic-require
}
console.log(models)
module.exports = models
