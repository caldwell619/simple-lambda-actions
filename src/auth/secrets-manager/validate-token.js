const getSecretValue = require('../../secrets-manager/getSecretValue')
const validateToken = require('../lib/validateToken')
const CustomError = require('../../util/ErrorHandler')

const validateTokenWithSecretsManager = async (secretsManagerParams, givenToken) => {
  const { SecretId, nameOfSecret } = secretsManagerParams
  try {
    const secretValue = await getSecretValue({ SecretId })
    const signingKey = secretValue[nameOfSecret]
    const decodedPayload = validateToken(givenToken, signingKey)
    return decodedPayload
  } catch(error){
   throw new CustomError({
      message: error.message,
      statusCode: error.statusCode
    })
  }
}

module.exports = validateTokenWithSecretsManager