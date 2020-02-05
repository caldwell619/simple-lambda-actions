const generateToken = require('./lib/generateToken')
const validateToken = require('./lib/validateToken')
const determineResourceAccess = require('./lib/determineResourceAccess')
const generateTokenWithSecretsManager = require('./secrets-manager/generateToken')
const validateTokenWithSecretsManager = require('./secrets-manager/validate-token')
const constructTokenPayload = require('./lib/constructTokenPayload')
const fullServiceAuth = require('./lib/fullService')
const signPayloadWithPolicyPermissions = require('./lib/signPayloadWithPolicyPermissions')

module.exports = {
  fullServiceAuth,
  validateToken,
  validateTokenWithSecretsManager,
  generateToken,
  generateTokenWithSecretsManager,
  determineResourceAccess,
  constructTokenPayload,
  signPayloadWithPolicyPermissions
}