

const getSecretValue = require('../../secrets-manager/getSecretValue')
const validateToken = require('../lib/validateToken')
const determineResourceAccess = require('../lib/determineResourceAccess')

const fullServiceAuth = (secretsManagerParams, event) => {
  const givenToken = event.headers['Authorization'] || ''
  const { SecretId, nameOfSecret } = secretsManagerParams
  return new Promise(async (resolve, reject) => {
    try {
      const secretValue = await getSecretValue({ SecretId })
      const signingKey = secretValue[nameOfSecret]
      const decodedPayload = await validateToken(givenToken, signingKey)
      determineResourceAccess(decodedPayload, event)
      return resolve(decodedPayload)
    } catch(error){
      return reject({
        message: error.message,
        statusCode: error.statusCode
      }) 
    }
  })
}

module.exports = fullServiceAuth