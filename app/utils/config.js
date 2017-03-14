/**
 * Default config
 * @property database - default config for database connection
 * @property general - general config for the application
 */
const config = {
  database: {
    default: {
      db: 'neko_api'
    },
    tests: {
      db: 'neko_tests'
    }
  },
  general: {
    port: 8085
  }
}

Object.assign(config, getCustomConfig())

module.exports = {
  set: partialOverride,
  get: partialGet,
}

/**
 * Set partially the global config given a path inside it.
 * The path can be simply be 'foo', or 'foo.bar'
 * @param {String} path - path of the subconfig
 * @param {Object} value - value of the subconfig
 */
function partialOverride(path, value) {
  if (path === '.') {
    throw new Error('config: cannot override full config')
  }
  const paths = path.split('.')
  const lastPath = paths.pop()
  const subconfig = paths.reduce((current, subPath) => current[subPath], config)
  subconfig[lastPath] = value
}

/**
 * Get from the global config the desired part
 * @param {String} path - path of the subconfig
 * @returns {Object} - the subconfig
 */
function partialGet(path) {
  if (path === '.') {
    return deepClone(config)
  }
  const paths = path.split('.')
  const subconfig = paths.reduce((current, subPath) => current[subPath], config)
  return deepClone(subconfig)
}

/**
 * Return the custom config
 * @returns {Object} Custom config
 */
function getCustomConfig() {
  try {
    return require('../../config.js') // eslint-disable-line import/no-unresolved
  } catch (err) {
    console.log('WARINING: using defaults for database connection')
    return {}
  }
}

/**
 * Deep clone of an object.
 * TODO: find better technique than mere serialization/deserialization
 * @param {Object} obj The object to clone
 * @returns {Object} The clone of the object
 */
function deepClone(obj) {
  if (obj === undefined || obj === null) {
    return obj
  }
  return JSON.parse(JSON.stringify(obj))
}
