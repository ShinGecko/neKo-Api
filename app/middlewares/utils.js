function responseTime() {
  return function (ctx, next) {
    const start = Date.now()
    return next().then(function () {
      const delta = Math.ceil(Date.now() - start)
      ctx.set('X-Response-Time', delta + 'ms')
    })
  }
}

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

function endOfStack(opts) {
  const { status, message } = Object.assign({
    status: 500,
    message: 'You should not be here...'
  }, opts)
  return function () {
    const err = new Error(message)
    err.status = status
    return Promise.reject(err)
  }
}

module.exports = {
  responseTime,
  catchErrors,
  endOfStack,
}
