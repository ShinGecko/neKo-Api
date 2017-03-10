// file: utils/thinky.js
const thinky = require('thinky')

const config = Object.assign({
  db: 'neko'
}, getCustomConfig())

const thinkyInstance = thinky(config)

module.exports = thinkyInstance

function getCustomConfig() {
  try {
    return require('../../config.js') // eslint-disable-line import/no-unresolved
  } catch (err) {
    console.log('WARNING: using defaults for database connection')
    return {}
  }
}
