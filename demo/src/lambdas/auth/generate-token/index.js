const { generateTokenWithSecretsManager } = require('simple-lambda-actions/dist/auth')
const { Responder, extractResponseParams } = require('simple-lambda-actions/dist/util/responseHandler')
const { statements } = require('./partial-user')
const SecretId = process.env.SIGNING_KEY_NAME

const config = {}

exports.handler = async event => {
  const responseConfig = extractResponseParams(event.httpMethod, config)
  const ResponseHandler = new Responder(responseConfig)
  const parsedBody = JSON.parse(event.body)
  try {
    const token = await generateTokenWithSecretsManager(SecretId, { ...parsedBody, statements}, '12h')
    return ResponseHandler.respond({ token }, 200)
  } catch(error){
    console.error('error post item --> ', error)
    return ResponseHandler.respond(error.message, error.statusCode || 500)
  }
}