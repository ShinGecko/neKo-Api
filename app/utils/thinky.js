// file: utils/thinky.js
const thinky = require('thinky')
const config = require('./config')

const dbConfig = config.get('database')

const thinkyInstance = thinky(dbConfig)

module.exports = thinkyInstance
