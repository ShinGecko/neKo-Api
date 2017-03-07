const colorCodes = {
  red: '0;31',
  green: '0;32',
  yellow: '0;33',
  blue: '0;34',
  magenta: '0;35',
  cyan: '0;36',
  grey: '0;37',
  boldRed: '1;31',
  boldGreen: '1;32',
  boldYellow: '1;33',
  boldBlue: '1;34',
  boldMagenta: '1;35',
  boldCyan: '1;36',
  boldGrey: '1;37',
}

const getters = {
  method: ctx => ctx.method,
  path: ctx => ctx.path,
  origin: ctx => ctx.origin,
  status: ctx => ctx.status,
  responseTime: ctx => ctx.response.get('X-Response-Time') || '?ms',
  contentLength: ctx => {
    const len = ctx.length
    if (!len) {
      return '0b'
    }
    const magnitude = getMagnitude(len)
    switch (magnitude) {
      case 1:
        return len + 'b'
      case 2:
        if (Number.isInteger(len / 1024)) {
          return len + 'kb'
        }
        return (Math.round(len / 1024 / 10) * 10) + 'kb'
      case 3:
        if (Number.isInteger(len / 1024 / 1024)) {
          return len + 'kb'
        }
        return (Math.round(len / 1024 / 1024 / 10) * 10) + 'mb'
      case 4:
        if (Number.isInteger(len / 1024 / 1024 / 1024)) {
          return len + 'kb'
        }
        return (Math.round(len / 1024 / 1024 / 1024 / 10) * 10) + 'gb'
      default:
        return len + 'b'
    }
  },
}

const clearColorCode = '0;0'

function colorize(str, colorName) {
  if (!colorName || !(colorName in colorCodes)) {
    return str
  }
  return `\u001b[${colorCodes[colorName]}m${str}\u001b[${clearColorCode}m`
}
/*
 * Logger takes in input an object containing all the settings for the logger: what to log,
 * with which colors...
 *
 * You can log 6 informations: method, path, origin, responseTime, contentLength, and status.
 *
 * The object contain three objects: _logs_, _colors_, and _separators_.
 * - logs:
 *   Contains two arrays of strings: _logs.in_ and _logs.out_.
 *   _logs.in_ is the list of informations to log when request arrives, and _logs.out_
 *   is the list of informations to log when the response leaves.
 * - colors:
 *   a map of color names for each information. Go see colorCodes for more info on the
 *   color names. If a key has a null value, or the color name is not recognized, then
 *   no color is applicated.
 * - separators:
 *   The characters to print when a request arrives (_separators.in_) and when a request
 *   leaves (_separators.out_). Default to '<--' and '-->'
 */
function logger(opts) {
  // default options
  const { logs, colors, separators } = Object.assign({
    logs: {
      in: [
        'method',
        'path',
        // 'origin',
      ],
      out: [
        'method',
        'path',
        'responseTime',
        'contentLength',
        'status',
      ],
    },
    colors: {
      method: 'yellow',
      path: null,
      origin: null,
      responseTime: null,
      contentLength: null,
      status: 'red',
    },
    separators: {
      in: '<--',
      out: '-->',
    },
  }, opts)

  return async function (ctx, next) {
    let lin = separators.in
    for (const key of logs.in) {
      lin += ' ' + colorize(getters[key](ctx), colors[key])
    }
    console.log(lin)
    await next()
    let lout = separators.out
    for (const key of logs.out) {
      lout += ' ' + colorize(getters[key](ctx), colors[key])
    }
    console.log(lout)
  }
}

module.exports = logger

function getMagnitude(nb) {
  let res = 1
  while (nb >= 1024) {
    nb /= 1024
    res += 1
  }
  return res
}
