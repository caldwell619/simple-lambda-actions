const getSecretValue = require('../../secrets-manager/getSecretValue')
const validateToken = require('../lib/validateToken')
const determineResourceAccess = require('../lib/determineResourceAccess')
const CustomError = require('../../util/ErrorHandler')

const fullServiceAuth = async (secretsManagerParams, event, dynamoParams) => {
  const givenToken = event.headers['Authorization'] || ''
  const { SecretId, nameOfSecret } = secretsManagerParams
  try {
    const secretValue = await getSecretValue({ SecretId })
    const signingKey = secretValue[nameOfSecret]
    const decodedPayload = validateToken(givenToken, signingKey)
    determineResourceAccess(decodedPayload, event, dynamoParams)
    return decodedPayload
  } catch(error){
    throw new CustomError({
      message: error.message,
      statusCode: error.statusCode
    }) 
  }
}

module.exports = fullServiceAuth