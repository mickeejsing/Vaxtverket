/**
 * Check if authenticated.
 *
 * @param {object} req - Request object.
 * @param {object} res - Response objekt.
 * @param {Function} next - Middleware.
 * @returns {any} Next function to be called.
 */
function auth (req, res, next) {
  if (req.session.data) {
    console.log(req.session.data)
  } else {
    res.status(404)
    res.send('Not found')
  }

  return next()
}

module.exports = auth
