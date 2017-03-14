/**
 * Represent an HttpError. Must be thrown by routes if it can't respond correctly
 * to the request (for example the user is not authorized)
 * @extends Error
 */
class HttpError extends Error {
  /**
   * Create an HttpError.
   * @param {String} msg explaination of the error
   * @param {Number} status HTTP status code ([list of status codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes))
   * @deprecated
   */
  constructor(msg, status) {
    console.error('WARINING: HttpError should\'nt be used, please use `ctx.throw` instead') // deprecated
    super(msg)
    this.status = status
    this.name = 'HttpError'
  }
}

module.exports = HttpError
