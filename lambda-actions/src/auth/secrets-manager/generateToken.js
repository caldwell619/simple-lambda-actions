const getSecretValue = require('../../secrets-manager/getSecretValue')
const generateToken = require('../lib/generateToken')

const generateTokenWithSecretsManager = (SecretId, payloadToEncode, expiresIn) => {
  const secretsManagerParams = { SecretId }
  return new Promise(async (resolve, reject) => {
    try {
      const secretValue = await getSecretValue(secretsManagerParams)
      const signingKey = secretValue[SecretId]
      const token = await generateToken(payloadToEncode, expiresIn, signingKey)
      return resolve(token)
    } catch(error){
      return reject({
        message: error.message,
        statusCode: error.statusCode
      })
    }
  })
}

module.exports = generateTokenWithSecretsManager