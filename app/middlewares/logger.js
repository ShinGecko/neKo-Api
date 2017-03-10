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

/**
 * The logger will log when a request comes in, and when a request comes out. It will log
 * different informations, and colored.
 * The function takes in input an object containing all the settings for the logger: what to log,
 * with which colors...
 * @param {Object} [opts] Contains all options.
 * @param {String[]} opts.logs.in Informations to log when a request comes in.
 * @param {String[]} opts.logs.out Informations to log when a response comes out.
 * @param {Object} opts.colors Link a color to an information. If the name is not known, no color is applied.
 * @param {String} opts.separators.in String to print when a request comes in.
 * @param {String} opts.separators.out String to print when a response comes out.
 * @returns {Function} Koa2 middleware
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
