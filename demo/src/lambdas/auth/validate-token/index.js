const { validateTokenWithSecretsManager } = require('simple-lambda-actions/dist/auth')
const Responder = require('simple-lambda-actions/dist/util/responseHandler')

const SecretId = process.env.SIGNING_KEY_NAME
const corsUrl = process.env.CORS_URL

exports.handler = async event => {
  const ResponseHandler = new Responder(corsUrl, event.httpMethod)
  const token = event.headers['Authorization'] || ''
  try {
    const decodedPayload = await validateTokenWithSecretsManager(SecretId, token)
    return ResponseHandler.respond(decodedPayload, 200)
  } catch(error){
    console.error('error post item --> ', error)
    return ResponseHandler.respond(error.message, error.statusCode || 500)
  }
}