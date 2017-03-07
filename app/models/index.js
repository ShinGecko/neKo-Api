const files = [
  'users',
  //'chat',
  //'users',
]

const models = files
    .map(file => `${__dirname}/${file}`)
    .map(require)

module.exports = models
