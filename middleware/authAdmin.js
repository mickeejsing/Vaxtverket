/**
 * Check if admin.
 *
 * @param {object} req - Request object.
 * @param {object} res - Response objekt.
 * @param {Function} next - Middleware.
 * @returns {any} Next function to be called.
 */
function authAdmin (req, res, next) {
  if (req.session.data.role === 'admin') {
    console.log(req.session.data)
  } else {
    res.status(404)
    res.send('Not found')
  }

  return next()
}

module.exports = authAdmin
