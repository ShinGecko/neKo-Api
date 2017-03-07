const files = [
  'users',
  //'chat',
  //'users',
]

const Controllers = files
    .map(file => `${__dirname}/${file}`)
    .map(require)

module.exports = Controllers
