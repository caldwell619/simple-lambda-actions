const getSecretValue = require('../../secrets-manager/getSecretValue')
const validateToken = require('../lib/validateToken')

const validateTokenWithSecretsManager = (SecretId, givenToken) => {
  const secretsManagerParams = { SecretId }
  return new Promise(async (resolve, reject) => {
    try {
      const secretValue = await getSecretValue(secretsManagerParams)
      const signingKey = secretValue[SecretId]
      const decodedPayload = await validateToken(givenToken, signingKey)
      return resolve(decodedPayload)
    } catch(error){
      return reject({
        message: error.message,
        statusCode: error.statusCode
      })
    }
  })
}

module.exports = validateTokenWithSecretsManager