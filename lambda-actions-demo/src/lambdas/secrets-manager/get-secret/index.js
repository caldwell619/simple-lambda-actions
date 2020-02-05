const getSecretValue = require('simple-lambda-actions/dist/secrets-manager/getSecretValue')
const { Responder, extractResponseParams } = require('simple-lambda-actions/dist/util/responseHandler')
const SecretId = process.env.SIGNING_KEY_NAME
const config = {}
const secretsManagerParams = { SecretId }

exports.handler = async event => {
  const responseConfig = extractResponseParams(event.httpMethod, config)
  const ResponseHandler = new Responder(responseConfig)
  try {
    const key = await getSecretValue(secretsManagerParams)
    return ResponseHandler.respond(key[SecretId], 200)
  } catch(error){
    console.error('Error getting secret key --> ', error)
    return ResponseHandler.respond(error.message, error.statusCode || 500)
  }
}