const validateToken = require('./validateToken')
const generateToken = require('./generateToken')
const determineResourceAccess = require('./determineResourceAccess')
const fullServiceAuth = require('./fullService')
const constructTokenPayload = require('./constructTokenPayload')

module.exports = {
  validateToken,
  generateToken,
  determineResourceAccess,
  constructTokenPayload,
  fullServiceAuth
}