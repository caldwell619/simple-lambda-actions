const getSecretValue = require('../../secrets-manager/getSecretValue')
const generateToken = require('../lib/generateToken')

const generateTokenWithSecretsManager = (secretsManagerParams, payloadToEncode, expiresIn) => {
  const { SecretId, nameOfSecret } = secretsManagerParams
  return new Promise(async (resolve, reject) => {
    try {
      const secretValue = await getSecretValue({ SecretId })
      const signingKey = secretValue[nameOfSecret]
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