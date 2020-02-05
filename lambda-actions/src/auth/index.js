const generateToken = require('./lib/generateToken')
const validateToken = require('./lib/validateToken')
const determineResourceAccess = require('./lib/determineResourceAccess')
const generateTokenWithSecretsManager = require('./secrets-manager/generateToken')
const validateTokenWithSecretsManager = require('./secrets-manager/validate-token')
const fullServiceAuth = require('./lib/fullService')

module.exports = {
  fullServiceAuth,
  validateToken,
  validateTokenWithSecretsManager,
  generateToken,
  generateTokenWithSecretsManager,
  determineResourceAccess
}