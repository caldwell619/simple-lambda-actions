const getSecretValue = require('../../secrets-manager/getSecretValue')
const generateToken = require('../lib/generateToken')
const CustomError = require('../../util/ErrorHandler')

const generateTokenWithSecretsManager = async (secretsManagerParams, payloadToEncode, expiresIn) => {
  const { SecretId, nameOfSecret } = secretsManagerParams
  try {
    const secretValue = await getSecretValue({ SecretId })
    const signingKey = secretValue[nameOfSecret]
    const token = generateToken(payloadToEncode, expiresIn, signingKey)
    return token
  } catch(error){
    throw new CustomError({
      message: error.message,
      statusCode: error.statusCode
    })
  }
}

module.exports = generateTokenWithSecretsManager