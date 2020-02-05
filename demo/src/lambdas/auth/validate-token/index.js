const { validateTokenWithSecretsManager } = require('simple-lambda-actions/dist/auth')
const getSecretValue = require('simple-lambda-actions/dist/secrets-manager/getSecretValue')
const { Responder, extractResponseParams } = require('simple-lambda-actions/dist/util/responseHandler')

const SecretId = process.env.SIGNING_KEY_NAME
const config = {}

exports.handler = async event => {
  const responseConfig = extractResponseParams(event.httpMethod, config)
  const ResponseHandler = new Responder(responseConfig)
  const token = event.headers['Authorization'] || ''
  try {
    const decodedPayload = await validateTokenWithSecretsManager(SecretId, token)
    return ResponseHandler.respond(decodedPayload, 200)
  } catch(error){
    console.error('error post item --> ', error)
    return ResponseHandler.respond(error.message, error.statusCode || 500)
  }
}