const { validateTokenWithSecretsManager, determineResourceAccess } = require('simple-lambda-actions/dist/auth')
const { Responder, extractResponseParams } = require('simple-lambda-actions/dist/util/responseHandler')
const config = {}
const SecretId = process.env.SIGNING_KEY_NAME

exports.handler = async event => {
  const responseConfig = extractResponseParams(event.httpMethod, config)
  const ResponseHandler = new Responder(responseConfig)
  
  try {
    const givenToken = event.headers['Authorization'] || ''
    const decodedPayload = await validateTokenWithSecretsManager(SecretId, givenToken)
    determineResourceAccess(decodedPayload, event)
    return ResponseHandler.respond({}, 200)
  } catch(error){
    console.error('error validating permission --> ', error)
    return ResponseHandler.respond(error.message, error.statusCode || 500)
  }
}