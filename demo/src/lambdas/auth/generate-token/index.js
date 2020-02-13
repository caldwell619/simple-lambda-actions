const { generateTokenWithSecretsManager } = require('simple-lambda-actions/dist/auth')
const { Responder, extractResponseParams } = require('simple-lambda-actions/dist/util/responseHandler')

const SecretId = process.env.SECRET_NAME
const nameOfSecret = process.env.SIGNING_KEY_NAME
const secretManagerParams = { SecretId, nameOfSecret }

const expiryDurationOfToken = '12h'
const config = {}

exports.handler = async event => {
  const responseConfig = extractResponseParams(event.httpMethod, config)
  const ResponseHandler = new Responder(responseConfig)
  const emailAddress = event.queryStringParameters.emailAddress
  const user = { role: 'full-user', emailAddress }
  try {
    const token = await generateTokenWithSecretsManager(secretManagerParams, user, expiryDurationOfToken)
    return ResponseHandler.respond({ token }, 200)
  } catch(error){
    console.error('error post item --> ', error)
    return ResponseHandler.respond(error.message, error.statusCode || 500)
  }
}