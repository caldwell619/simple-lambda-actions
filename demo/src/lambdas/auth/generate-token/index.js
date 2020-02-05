const { queryItem } = require('simple-lambda-actions/dist/dynamo')
const { generateTokenWithSecretsManager } = require('simple-lambda-actions/dist/auth')
const { Responder, extractResponseParams } = require('simple-lambda-actions/dist/util/responseHandler')

const SecretId = process.env.SIGNING_KEY_NAME
const TableName = process.env.TABLE_NAME
const partitionKeyName = process.env.TABLE_PARTITION_KEY
const rangeKeyName = process.env.TABLE_RANGE_KEY

const config = {}

exports.handler = async event => {
  const responseConfig = extractResponseParams(event.httpMethod, config)
  const ResponseHandler = new Responder(responseConfig)
  const parsedBody = JSON.parse(event.body)
  const role = parsedBody.user.role
  const params = {
    TableName,
    partitionKeyName,
    partitionKeySearchTerm: `${role}-policy`, 
  }
  const contextResource = {
    institutionId: parsedBody.user.institutionId,
    userId: parsedBody.user.userId,
    emailAddress: parsedBody.user.emailAddress,
    resource: event.path,
    action: event.httpMethod
  }
  try {
    const { Items } = await queryItem(params, true)
    const token = await generateTokenWithSecretsManager(SecretId, { ...contextResource, statements: Items}, '12h')
    return ResponseHandler.respond({ token }, 200)
  } catch(error){
    console.error('error post item --> ', error)
    return ResponseHandler.respond(error.message, error.statusCode || 500)
  }
}