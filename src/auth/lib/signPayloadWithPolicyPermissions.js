const { getObject } = require('../../s3/')
const constructTokenPayload = require('./constructTokenPayload')
const generateTokenWithSecretsManager = require('../secrets-manager/generateToken')

const allowableRoles = {
  'user': true,
  'admin': true
}

const signTokenWithPolicyPermissions = (s3Params, roleToSignToken, tokenRequesterInformation, secretsManagerParams, expiryDurationOfToken) => {
  return new Promise(async (resolve, reject) => {
    const roleIsAllowed = allowableRoles[roleToSignToken]
    if(!roleIsAllowed){
      return reject({
        message: 'Role not supported',
        statusCode: 400
      })
    }
    try {
      const { statements } = await getObject(s3Params)
      const tokenPayload = constructTokenPayload(roleToSignToken, tokenRequesterInformation, statements)
      const token = await generateTokenWithSecretsManager(secretsManagerParams, tokenPayload, expiryDurationOfToken)
      return resolve(token)
    } catch(error){
      return reject({
        message: error.message,
        statusCode: error.statusCode || 500
      })
    }
  })
}

module.exports = signTokenWithPolicyPermissions