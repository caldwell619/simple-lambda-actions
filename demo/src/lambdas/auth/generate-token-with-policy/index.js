const { signPayloadWithPolicyPermissions } = require('simple-lambda-actions/dist/auth')
const { Responder, extractResponseParams } = require('simple-lambda-actions/dist/util/responseHandler')
const SecretId = process.env.SIGNING_KEY_NAME

const Bucket = 'lambda-actions-test'
const Key = 'partial-user.json'
const s3Params = { Bucket, Key }
const config = {}

const user = {
  userId: '1234',
  emailAddress: 'bigBoi524@maik.com',
  role: 'partial-user',
  institutionId: '1234'
}

const roleToSignToken = 'user'
const expiryDurationOfToken = '12h'

exports.handler = async event => {
  const responseConfig = extractResponseParams(event.httpMethod, config)
  const ResponseHandler = new Responder(responseConfig)
  try {
    const token = await signPayloadWithPolicyPermissions(s3Params, roleToSignToken, user, SecretId, expiryDurationOfToken)
    return ResponseHandler.respond({ token }, 200)
  } catch(error){
    console.error('error post item --> ', error)
    return ResponseHandler.respond(error.message, error.statusCode || 500)
  }
}