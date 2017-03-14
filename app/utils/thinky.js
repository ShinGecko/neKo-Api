// file: utils/thinky.js
const thinky = require('thinky')
const config = require('./config')

const defaultConf = config.get('database.default')
const current = config.get(`database.${process.env.NODE_ENV || 'default'}`)
const dbConfig = Object.assign({}, defaultConf, current)

const thinkyInstance = thinky(dbConfig)

module.exports = thinkyInstance
