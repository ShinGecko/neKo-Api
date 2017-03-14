/**
 * koa@2 middleware which adds an header 'X-Response-Time' with the duration of
 * taken by the server to respond in ms.
 * @returns {Function} koa@2 middleware
 */
function responseTime() {
  return function (ctx, next) {
    const start = Date.now()
    return next().then(function () {
      const delta = Math.ceil(Date.now() - start)
      ctx.set('X-Response-Time', delta + 'ms')
    })
  }
}

/**
 * Middleware who will catch errors and print them nicely
 * @param {Object} opts Options for the catchErrors middleware
 * @param {Boolean} opts.toJson Return error as JSON
 * @param {Boolean} opts.includeStack Include stack trace in error message
 * @returns {Function} koa@2 middleware
 */
function catchErrors(opts) {
  const { toJson, includeStack } = Object.assign({ toJson: false, includeStack: false }, opts)
  return (ctx, next) =>
  next().catch(err => {
    let res
    if (toJson) {
      res = {
        message: err.message,
      }
      if (includeStack) {
        res.stack = err.stack
      }
    } else {
      res = `<h4>Oops! Something went wrong...</h4>
      <p>Here, the message:<br><code>${err.message}</code></p>`
      if (includeStack) {
        res += `<p>And this is the stack:<br><code>${err.stack}</code></p>`
      }
    }
    ctx.status = err.status || 505
    ctx.body = res
  })
}

/**
 * koa@2 middleware raising an error if attained
 * @param {Object} opts Object for all options
 * @returns {Function} koa@2 middleware
 */
function endOfStack(opts) {
  const { status, message } = Object.assign({
    status: 500,
    message: 'You should not be here...'
  }, opts)
  return function (ctx) {
    if (ctx.status === 404) {
      ctx.throw(status, message)
    }
  }
}

module.exports = {
  responseTime,
  catchErrors,
  endOfStack,
}
